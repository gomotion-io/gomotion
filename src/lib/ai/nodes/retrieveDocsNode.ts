// src/nodes/retrieveDocsNode.ts
import { RemotionAgentState } from '../state';
import { ragUtil } from '../tools/ragSetup';
import { RemotionAgentConfig } from '../types';
import { AIMessage } from '@langchain/core/messages'; // Or ToolMessage

export async function retrieveDocsNode(
  state: RemotionAgentState,
  config: Required<RemotionAgentConfig>
): Promise<Partial<RemotionAgentState>> {
  console.log("--- Retrieving Documentation (RAG) ---");

  if (!config.rag.enabled) {
    console.log("RAG is disabled. Skipping documentation retrieval.");
    return { ragContext: null };
  }

  if (!ragUtil.isInitialized) {
    console.warn("RAG utility not initialized. Skipping documentation retrieval.");
    return { ragContext: null };
  }

  if (!state.enhancedPrompt) {
    console.warn("Enhanced prompt is missing. Cannot retrieve relevant documents.");
    return { ragContext: null };
  }

  try {
    const context = await ragUtil.retrieveContext(state.enhancedPrompt, config.rag);
    if (context && context.length > 0) {
        console.log(`Retrieved RAG context (first 300 chars): ${context.substring(0,300)}...`);
        return { 
            ragContext: context,
            messages: [...state.messages, new AIMessage({ content: `Retrieved RAG context (length: ${context.length})`})] // Or a ToolMessage
        };
    } else {
        console.log("No relevant RAG context found.");
        return { ragContext: null };
    }
  } catch (error: any) {
    console.error("Error during RAG retrieval:", error);
    return { 
        ragContext: null,
        messages: [...state.messages, new AIMessage({ content: `Error retrieving RAG context: ${error.message}`})]
    };
  }
}