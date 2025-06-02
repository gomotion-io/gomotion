// src/nodes/generateCodeNode.ts
import { RemotionAgentState } from '../state';
import { ChatOpenAI } from '@langchain/openai';
import { getGenerateCodePromptTemplate } from '../prompts';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { RemotionAgentConfig } from '../types';

// Utility to clean LLM output of code fences and other common artifacts
function cleanLLMCodeOutput(code: string): string {
  let cleaned = code;
  // Remove markdown fences (e.g., ```tsx ... ``` or ```typescript ... ```)
  // This regex handles optional language specifier and leading/trailing newlines within the fences.
  cleaned = cleaned.replace(/^```(?:\w+\s*)?\r?\n([\s\S]*?)\r?\n```$/gm, '$1');
  // Sometimes LLMs might just output the code without fences but still add comments like "Here's the code:"
  // This is harder to generically remove without risking removal of actual code comments.
  // For now, we'll rely on the prompt instructing the LLM to ONLY output code.
  return cleaned.trim();
}


export async function generateCodeNode(
  state: RemotionAgentState,
  llm: ChatOpenAI,
  config: Required<RemotionAgentConfig>
): Promise<Partial<RemotionAgentState>> { // Or use PartialStateUpdater<RemotionAgentState>
  const currentAttempt = state.totalAttempts + 1; // This will be the current attempt number
  console.log(`--- Generating Remotion Code (Attempt: ${currentAttempt}) ---`);

  if (!state.enhancedPrompt) {
    const errorMessage = "Enhanced prompt is missing. Cannot generate code.";
    console.error(errorMessage);
    return { 
        generatedCode: null, 
        currentErrors: [...(state.currentErrors || []), errorMessage],
        validationStatus: 'failure', // Mark as failure to prevent validation
        totalAttempts: currentAttempt -1, // Don't increment if we didn't try
    };
  }

  const promptTemplate = getGenerateCodePromptTemplate(config);
  
  let ragContextSection = "";
  if (state.ragContext && config.rag.enabled) {
    ragContextSection = `\nRelevant Documentation (Context from RAG):\n${state.ragContext}`;
  }

  let errorSection = "";
  if (state.currentErrors && state.currentErrors.length > 0) {
    // Provide only the last few, most relevant errors to avoid overwhelming the LLM context
    const recentErrors = state.currentErrors.slice(-3).join("\n- "); // Last 3 errors
    errorSection = `\nPREVIOUS ATTEMPT FAILED. You MUST fix the following errors:\n- ${recentErrors}`;
  }

  // Construct the human message part carefully
  const humanMessageContent = `User Requirements / Enhanced Prompt:
${state.enhancedPrompt}${ragContextSection}${errorSection}

Please generate the Remotion TSX code now. Remember to output ONLY the raw TSX code.`;

  const messagesForLLM = [
    // System prompt is already part of promptTemplate
    // Human message containing all context
    new HumanMessage(humanMessageContent),
  ];
  
  // The `getGenerateCodePromptTemplate` returns a ChatPromptTemplate which expects an object for `formatMessages`
  // The actual system prompt is included when `promptTemplate.formatMessages` is called.
  // Let's form the final prompt using the template directly.
  
  const formattedPromptMessages = await promptTemplate.formatMessages({
    enhancedPrompt: state.enhancedPrompt,
    ragContextSection: ragContextSection, // Pass as empty if not used
    errorSection: errorSection, // Pass as empty if no errors
  });


  try {
    const response = await llm.invoke(formattedPromptMessages);
    const rawGeneratedCode = response.content as string;
    const cleanedGeneratedCode = cleanLLMCodeOutput(rawGeneratedCode);

    if (!cleanedGeneratedCode || cleanedGeneratedCode.length < 50) { // Arbitrary short length check
        const shortCodeError = "Generated code is unexpectedly short or empty. This might indicate an LLM issue or a problem with the prompt.";
        console.error(shortCodeError, "Raw output:", rawGeneratedCode);
        return {
            generatedCode: null,
            validationStatus: 'failure',
            currentErrors: [...(state.currentErrors || []), shortCodeError],
            totalAttempts: currentAttempt, // Attempt was made
            messages: [...state.messages, new AIMessage({ content: rawGeneratedCode })],
        };
    }

    console.log(`Generated Code Snippet (first 500 chars): ${cleanedGeneratedCode.substring(0, 500)}...`);

    return {
      generatedCode: cleanedGeneratedCode,
      totalAttempts: currentAttempt,
      messages: [...state.messages, new AIMessage({ content: cleanedGeneratedCode })], // Store the cleaned code
      currentErrors: [], // Clear previous errors for the new attempt's validation
      validationStatus: 'pending', // Reset for the upcoming validation
    };
  } catch (error: any) {
    const errorMessage = `LLM invocation failed during code generation: ${error.message}`;
    console.error(errorMessage, error);
    return {
        generatedCode: null,
        validationStatus: 'failure', // Mark as failure
        currentErrors: [...(state.currentErrors || []), errorMessage],
        totalAttempts: currentAttempt, // Attempt was made
        messages: [...state.messages, new AIMessage({ content: `Error during code generation: ${errorMessage}` })],
    };
  }
}