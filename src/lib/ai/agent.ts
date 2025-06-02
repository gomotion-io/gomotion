// src/agent.ts
import { StateGraph, END, START } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { v4 as uuidv4 } from 'uuid';

import { RemotionAgentState, getInitialState } from "./state";
import { RemotionAgentConfig, AgentResult } from "./types";
import { getConfig } from "./config";
import { ragUtil } from "./tools/ragSetup";

// Import node functions
import { enhancePromptNode } from "./nodes/enhancePromptNode";
import { retrieveDocsNode } from "./nodes/retrieveDocsNode";
import { generateCodeNode } from "./nodes/generateCodeNode";
import { validateCodeNode } from "./nodes/validateCodeNode";
import { handleFailureNode } from "./nodes/handleFailureNode";
import { HumanMessage } from "@langchain/core/messages";

export class RemotionAgent {
  private workflow: StateGraph<RemotionAgentState>;
  private llm: ChatOpenAI;
  private config: Required<RemotionAgentConfig>;

  constructor(userConfig: RemotionAgentConfig) {
    this.config = getConfig(userConfig);
    this.llm = new ChatOpenAI({
      openAIApiKey: this.config.openaiApiKey,
      modelName: this.config.llm.modelName,
      temperature: this.config.llm.temperature,
    });

    this.workflow = new StateGraph<RemotionAgentState>({
      channels: {
        sessionId: { value: (x, y) => y ?? x, default: () => uuidv4() },
        originalPrompt: { value: (x, y) => y ?? x },
        enhancedPrompt: { value: (x, y) => y ?? x },
        ragContext: { value: (x, y) => y ?? x },
        generatedCode: { value: (x, y) => y ?? x },
        validationLog: { value: (x: string[], y: string[]) => (x || []).concat(y || []), default: () => [] },
        validationStatus: { value: (x, y) => y ?? x },
        currentErrors: { value: (x: string[], y: string[]) => (y === null ? [] : (y || x || [])), default: () => []},
        totalAttempts: { value: (x, y) => y ?? x },
        finalCode: { value: (x, y) => y ?? x },
        finalUserMessage: { value: (x, y) => y ?? x },
        messages: { value: (x: any[], y: any[]) => (x || []).concat(y || []), default: () => [] },
        animationConfig: { value: (x,y) => y ?? x }
      }
    });

    this.setupGraph();
  }

  private setupGraph(): void {
    this.workflow.addNode("enhance_prompt", (state) => enhancePromptNode(state, this.llm, this.config))
    // .addNode("retrieve_docs", (state) => retrieveDocsNode(state, this.config))
    .addNode("generate_code", (state) => generateCodeNode(state, this.llm, this.config))
    // .addNode("validate_code", (state) => validateCodeNode(state, this.config))
    // .addNode("handle_failure", handleFailureNode)
    .addEdge(START, "enhance_prompt")

    .addEdge("enhance_prompt", "generate_code")
    
    // .addEdge("enhance_prompt", "retrieve_docs")
    // .addConditionalEdges("retrieve_docs", 
    //     (state) => state.enhancedPrompt === null ? "handle_failure" : "generate_code",
    //     {
    //         "generate_code": "generate_code",
    //         "handle_failure": "handle_failure"
    //     }
    // )
    .addEdge("generate_code", END)
    // .addEdge("generate_code", "validate_code")
    // .addConditionalEdges(
    //   "validate_code",
    //   this.shouldRetryOrEnd.bind(this),
    //   {
    //     "retry_generation": "generate_code",
    //     "finalize_failure": "handle_failure",
    //     "end_successfully": END,
    //   }
    // )
    // .addEdge("handle_failure", END);
  }

  private shouldRetryOrEnd(state: RemotionAgentState): "retry_generation" | "finalize_failure" | "end_successfully" {
    if (state.validationStatus === 'success') {
      console.log("Validation successful. Ending process.");
      return "end_successfully";
    }

    // If validation failed but generatedCode is null (e.g. enhance_prompt failed)
    if (!state.generatedCode && state.validationStatus === 'failure') {
        console.log("Critical failure before code generation or validation. Ending.");
        return "finalize_failure";
    }

    const maxRetries = this.config.errorHandling?.maxRetries ?? 3; // Default to 3 if undefined
    if (state.totalAttempts > maxRetries) { // totalAttempts = 1 (initial) + maxRetries
      console.log(`Max retries (${maxRetries}) reached. Finalizing as failure.`);
      return "finalize_failure";
    }
    
    console.log(`Validation failed. Attempt ${state.totalAttempts}/${maxRetries + 1}. Retrying code generation.`);
    return "retry_generation";
  }

  public async initialize(): Promise<void> {
    if (this.config.rag.enabled) {
      await ragUtil.initialize(this.config.rag, this.config.openaiApiKey);
    }
  }
  
  public async generateRemotionCode(userPrompt: string): Promise<AgentResult> {
    const compiledGraph = this.workflow.compile();
    const sessionId = uuidv4(); // Unique ID for this run

    const initialState: RemotionAgentState = {
      ...getInitialState(),
      sessionId: sessionId,
      originalPrompt: userPrompt,
      messages: [new HumanMessage(userPrompt)], // Start message history
    };

    console.log(`Starting Remotion code generation for session: ${sessionId}`);
    
    // For debugging stream:
    // for await (const event of await compiledGraph.stream(initialState, { recursionLimit: 15 })) {
    //   console.log("--- LangGraph Event ---");
    //   console.log(JSON.stringify(event, null, 2));
    //   console.log("-----------------------");
    // }
    // const finalState = await compiledGraph.invoke(initialState, { recursionLimit: 15 });


    const finalState: Partial<RemotionAgentState> = await compiledGraph.invoke(initialState, { recursionLimit: 25 }); // Increased recursion limit

    return {
      success: finalState.finalCode !== null && finalState.validationStatus === 'success',
      finalCode: finalState.generatedCode ?? "",
      enhancedPrompt: finalState.enhancedPrompt ?? "",
      errors: finalState.currentErrors ?? [], // Last known errors
      validationLog: finalState.validationLog ?? [],
      totalAttempts: finalState.totalAttempts ?? 0,
      messageHistory: finalState.messages,
    };
  }
}