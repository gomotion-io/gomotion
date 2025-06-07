from langchain_openai import ChatOpenAI
from langchain_core.messages import AIMessage
from .state import RemotionAgentState, AnimationParameters
from .config import RemotionAgentConfig
from .prompts import get_enhance_prompt_template, get_generate_code_prompt_template, extract_animation_parameters
import logging

logger = logging.getLogger(__name__)

async def enhance_prompt_node(state: RemotionAgentState, llm: ChatOpenAI, config: RemotionAgentConfig) -> dict:
    logger.info("NODE: enhance_prompt")
    prompt_template = get_enhance_prompt_template(config)
    chain = prompt_template | llm

    response = await chain.ainvoke({"userPrompt": state["originalPrompt"]})
    enhanced_prompt_text = response.content if isinstance(response.content, str) else ""
    
    # Extract animation parameters
    default_params = config.get("codeValidation", {})
    animation_config = extract_animation_parameters(enhanced_prompt_text, default_params)
    
    logger.info(f"Enhanced prompt generated. Animation config: {animation_config}")

    return {
        "enhancedPrompt": enhanced_prompt_text,
        "messages": [response], # Add LLM response to messages
        "animationConfig": animation_config
    }

async def generate_code_node(state: RemotionAgentState, llm: ChatOpenAI, config: RemotionAgentConfig) -> dict:
    logger.info("NODE: generate_code")
    if not state.get("enhancedPrompt"):
        logger.error("Cannot generate code without an enhanced prompt.")
        return {"generatedCode": None, "currentErrors": ["Enhanced prompt is missing."]}

    prompt_template = get_generate_code_prompt_template(config)
    
    rag_context_section = f"Relevant Documentation:\n{state['ragContext']}\n" if state.get("ragContext") else ""
    error_section = f"Previous Errors (Please Fix These):\n{'\n'.join(state['currentErrors'])}\n" if state.get("currentErrors") else ""
    
    chain = prompt_template | llm
    
    response = await chain.ainvoke({
        "enhancedPrompt": state["enhancedPrompt"],
        "ragContextSection": rag_context_section,
        "errorSection": error_section
    })
    
    generated_code_text = response.content if isinstance(response.content, str) else ""
    # Clean up potential markdown fences if LLM adds them despite instructions
    if generated_code_text.startswith("```tsx"):
        generated_code_text = generated_code_text[len("```tsx"):]
    if generated_code_text.startswith("```typescript"):
        generated_code_text = generated_code_text[len("```typescript"):]
    if generated_code_text.endswith("```"):
        generated_code_text = generated_code_text[:-len("```")]
    generated_code_text = generated_code_text.strip()
    
    logger.info("Code generated.")
    return {
        "generatedCode": generated_code_text,
        "messages": [response], # Add LLM response
        "totalAttempts": state.get("totalAttempts", 0) + 1
    }

# --- Placeholder nodes for RAG, Validation, Failure Handling (if you expand later) ---
async def retrieve_docs_node(state: RemotionAgentState, config: RemotionAgentConfig) -> dict:
    logger.info("NODE: retrieve_docs (Placeholder)")
    # Here you would implement RAG logic using Langchain retrievers
    # For now, returning empty context
    if not config.get("rag", {}).get("enabled", False):
        return {"ragContext": None}
        
    # Example:
    # if ragUtil.is_initialized():
    # retriever = ragUtil.get_retriever()
    # docs = await retriever.ainvoke(state["enhancedPrompt"])
    # context = "\n".join([doc.page_content for doc in docs])
    # return {"ragContext": context}
    return {"ragContext": "Placeholder RAG context based on: " + (state.get("enhancedPrompt") or "")}


async def validate_code_node(state: RemotionAgentState, config: RemotionAgentConfig) -> dict:
    logger.info("NODE: validate_code (Placeholder)")
    # This is where you'd run the Remotion build/render test in a sandbox
    # For now, we'll assume success if code is generated
    if state.get("generatedCode"):
        logger.info("Code validation successful (Placeholder).")
        return {"validationStatus": "success", "finalCode": state["generatedCode"], "currentErrors": []}
    else:
        logger.warning("Code validation failed as no code was generated (Placeholder).")
        return {"validationStatus": "failure", "currentErrors": ["No code generated to validate."]}

async def handle_failure_node(state: RemotionAgentState) -> dict:
    logger.info("NODE: handle_failure")
    user_message = "Sorry, I couldn't generate the Remotion animation after multiple attempts."
    if state.get("currentErrors"):
        user_message += " Last error: " + state["currentErrors"][0][:200] # Show a snippet
    return {"finalUserMessage": user_message, "finalCode": None} 