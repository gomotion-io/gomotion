import uuid as py_uuid # Alias to avoid conflict if uuid is used as a var name
from langgraph.graph import StateGraph, END, START
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, BaseMessage
from langchain_core.language_models.chat_models import BaseChatModel

from .state import RemotionAgentState, get_initial_state
from .config import RemotionAgentConfig, get_config as get_agent_config
import asyncio
# from .tools.ragSetup import ragUtil # If you implement RAG

# Import node functions
from .nodes import (
    enhance_prompt_node,
    # retrieve_docs_node, # Uncomment when RAG is ready
    generate_code_node,
    # validate_code_node, # Uncomment when validation is ready
    # handle_failure_node # Uncomment for error handling
)
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class RemotionAgent:
    def __init__(self, user_config_dict: dict):
        self.config: RemotionAgentConfig = get_agent_config(user_config_dict)
        self.llm: BaseChatModel = self._initialize_llm()

        self.workflow = StateGraph(RemotionAgentState)
        self._setup_graph()
        self.compiled_graph = self.workflow.compile()

    def _initialize_llm(self) -> BaseChatModel:
        llm_config = self.config.get("llm", {})
        provider = llm_config.get("provider", "openai")
        model_name = llm_config.get("modelName")
        temperature = llm_config.get("temperature", 0.1)

        if provider == "google":
            logger.info(f"Initializing Google Gemini LLM: {model_name or 'gemini-pro'}")
            if not self.config.get("googleApiKey"):
                raise ValueError("Google API Key not found in config for Gemini LLM.")
            return ChatGoogleGenerativeAI(
                model=model_name or "gemini-pro",
                temperature=temperature,
                google_api_key=self.config["googleApiKey"],
            )
        elif provider == "openai":
            logger.info(f"Initializing OpenAI LLM: {model_name or 'gpt-4-turbo-preview'}")
            if not self.config.get("openaiApiKey"):
                raise ValueError("OpenAI API Key not found in config for OpenAI LLM.")
            return ChatOpenAI(
                openai_api_key=self.config["openaiApiKey"],
                model_name=model_name or "gpt-4-turbo-preview",
                temperature=temperature,
            )
        else:
            raise ValueError(f"Unsupported LLM provider: {provider}")

    def _setup_graph(self):
        # Create async wrappers for the node functions
        async def enhance_prompt_wrapper(state):
            return await enhance_prompt_node(state, self.llm, self.config)

        async def generate_code_wrapper(state):
            return await generate_code_node(state, self.llm, self.config)

        # Add nodes with async wrappers
        self.workflow.add_node("enhance_prompt", enhance_prompt_wrapper)
        self.workflow.add_node("generate_code", generate_code_wrapper)

        self.workflow.add_edge(START, "enhance_prompt")
        self.workflow.add_edge("enhance_prompt", "generate_code")
        self.workflow.add_edge("generate_code", END)

        # from IPython.display import Image, display
        # from langchain_core.runnables.graph import CurveStyle, MermaidDrawMethod, NodeStyles

        # display(Image(agent.get_graph().draw_mermaid_png()))

        # More complex flow (uncomment and adapt when ready):
        # self.workflow.add_conditional_edges(
        # "enhance_prompt",
        # lambda state: "retrieve_docs" if self.config.get("rag", {}).get("enabled") else "generate_code",
        # {
        # "retrieve_docs": "retrieve_docs",
        # "generate_code": "generate_code",
        # }
        # )
        # self.workflow.add_edge("retrieve_docs", "generate_code")
        # self.workflow.add_edge("generate_code", "validate_code")
        # self.workflow.add_conditional_edges(
        # "validate_code",
        # self._should_retry_or_end,
        # {
        # "retry_generation": "generate_code", # Or "retrieve_docs" if errors might be RAG related
        # "finalize_failure": "handle_failure",
        # "end_successfully": END,
        # }
        # )
        # self.workflow.add_edge("handle_failure", END)

    def _should_retry_or_end(self, state: RemotionAgentState) -> str:
        if state.get("validationStatus") == 'success':
            logger.info("Validation successful. Ending process.")
            return "end_successfully"

        if not state.get("generatedCode") and state.get("validationStatus") == 'failure':
            logger.info("Critical failure before code generation or validation. Ending.")
            return "finalize_failure"

        max_retries = self.config.get("errorHandling", {}).get("maxRetries", 3)
        # totalAttempts includes the first attempt, so compare with max_retries + 1
        if state.get("totalAttempts", 0) > max_retries : # type: ignore
            logger.info(f"Max retries ({max_retries}) reached. Finalizing as failure.")
            return "finalize_failure"
        
        logger.info(f"Validation failed. Attempt {state.get('totalAttempts')}/{max_retries +1 }. Retrying code generation.")
        # Important: Reset relevant parts of state for retry
        # state["currentErrors"] should be set by validate_code_node
        # state["generatedCode"] = None # Clear previous faulty code
        # state["ragContext"] = None # Optionally re-fetch RAG context
        return "retry_generation"

    async def initialize_rag(self):
        # if self.config.get("rag", {}).get("enabled"):
        # await ragUtil.initialize(self.config["rag"], self.config["openaiApiKey"])
        pass # Placeholder for RAG initialization

    async def generate_remotion_code(self, user_prompt: str) -> dict:
        session_id = str(py_uuid.uuid4())
        initial_state_base = get_initial_state()
        
        initial_state: RemotionAgentState = {
            **initial_state_base,
            "sessionId": session_id,
            "originalPrompt": user_prompt,
            "messages": [HumanMessage(content=user_prompt)],
        }

        logger.info(f"Starting Remotion code generation for session: {session_id}, prompt: '{user_prompt}' using LLM: {self.config.get('llm',{}).get('provider')}")
        
        try:
            final_state_result = await self.compiled_graph.ainvoke(initial_state)
            
            if final_state_result is None:
                logger.error("Graph execution finished without reaching a proper end state.")
                return {
                    "success": False,
                    "finalCode": None,
                    "enhancedPrompt": None,
                    "animationConfig": None,
                    "errors": ["Graph execution failed to complete."],
                    "validationLog": [],
                    "totalAttempts": initial_state.get("totalAttempts", 0),
                    "messageHistory": initial_state.get("messages", []),
                }

            is_success = final_state_result.get("generatedCode") is not None
            return {
                "success": is_success,
                "finalCode": final_state_result.get("generatedCode") if is_success else None,
                "enhancedPrompt": final_state_result.get("enhancedPrompt"),
                "animationConfig": final_state_result.get("animationConfig"),
                "errors": final_state_result.get("currentErrors", []),
                "validationLog": final_state_result.get("validationLog", []),
                "totalAttempts": final_state_result.get("totalAttempts", 0),
                "messageHistory": final_state_result.get("messages", []),
            }
        except Exception as e:
            logger.error(f"Error in generate_remotion_code: {str(e)}", exc_info=True)
            return {
                "success": False,
                "finalCode": None,
                "enhancedPrompt": None,
                "animationConfig": None,
                "errors": [str(e)],
                "validationLog": [],
                "totalAttempts": initial_state.get("totalAttempts", 0),
                "messageHistory": initial_state.get("messages", []),
            } 