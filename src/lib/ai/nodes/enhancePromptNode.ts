// src/nodes/enhancePromptNode.ts
import { RemotionAgentState, AnimationParameters } from '../state';
import { ChatOpenAI } from '@langchain/openai';
import { getEnhancePromptTemplate } from '../prompts';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { RemotionAgentConfig } from '../types';

// Helper function to parse animation parameters from the enhanced prompt
// This is a simplified example; robust parsing is challenging.
// Consider structured output from LLM if this becomes unreliable.
function parseAnimationParameters(
  enhancedPromptText: string,
  defaultConfig: Required<RemotionAgentConfig>['codeValidation']
): AnimationParameters {
  let compositionId = defaultConfig.defaultCompositionId;
  let durationInFrames = 150; // Default 5 seconds at 30fps
  let fps = 30;
  let width = 1920;
  let height = 1080;

  // Try to extract Composition ID
  const compIdMatch = enhancedPromptText.match(/Composition ID:\s*["']?([\w-]+)["']?/i);
  if (compIdMatch && compIdMatch[1]) {
    compositionId = compIdMatch[1];
  }

  // Try to extract Duration
  const durationMatch = enhancedPromptText.match(/Duration:\s*(\d+)\s*frames/i);
  if (durationMatch && durationMatch[1]) {
    durationInFrames = parseInt(durationMatch[1], 10);
  }

  // Try to extract FPS
  const fpsMatch = enhancedPromptText.match(/FPS:\s*(\d+)/i);
  if (fpsMatch && fpsMatch[1]) {
    fps = parseInt(fpsMatch[1], 10);
  }

  // Try to extract Dimensions (e.g., "Width: 1920, Height: 1080" or "1920x1080")
  const widthMatch = enhancedPromptText.match(/Width:\s*(\d+)/i);
  if (widthMatch && widthMatch[1]) {
    width = parseInt(widthMatch[1], 10);
  }
  const heightMatch = enhancedPromptText.match(/Height:\s*(\d+)/i);
  if (heightMatch && heightMatch[1]) {
    height = parseInt(heightMatch[1], 10);
  } else {
    const dimensionsMatch = enhancedPromptText.match(/(\d+)x(\d+)/i);
    if (dimensionsMatch && dimensionsMatch[1] && dimensionsMatch[2]) {
      width = parseInt(dimensionsMatch[1], 10);
      height = parseInt(dimensionsMatch[2], 10);
    }
  }
  
  console.log("Parsed Animation Parameters:", { compositionId, durationInFrames, fps, width, height });
  return { compositionId: compositionId ?? "", durationInFrames, fps, width, height };
}

export async function enhancePromptNode(
  state: RemotionAgentState,
  llm: ChatOpenAI,
  config: Required<RemotionAgentConfig>
): Promise<Partial<RemotionAgentState>> { // Or use PartialStateUpdater<RemotionAgentState>
  console.log("--- Enhancing User Prompt ---");

  const promptTemplate = getEnhancePromptTemplate(config);
  const formattedPrompt = await promptTemplate.formatMessages({
    userPrompt: state.originalPrompt,
  });

  try {
    const response = await llm.invoke(formattedPrompt);
    const enhancedPromptText = response.content as string;
    console.log(`Enhanced Prompt (first 500 chars): ${enhancedPromptText.substring(0, 500)}...`);

    const animationConfig = parseAnimationParameters(enhancedPromptText, config.codeValidation);

    return {
      enhancedPrompt: enhancedPromptText,
      animationConfig: animationConfig,
      messages: [...state.messages, new AIMessage({ content: `Enhanced prompt created: ${enhancedPromptText}` })],
      totalAttempts: 0, // Reset attempts for new generation cycle
      currentErrors: [], // Clear any prior errors
      validationLog: [], // Clear prior validation logs
    };
  } catch (error: any) {
    console.error("Error during prompt enhancement:", error);
    const errorMessage = `Failed to enhance prompt: ${error.message}`;
    return {
        enhancedPrompt: null, // Signal failure
        animationConfig: null,
        currentErrors: [errorMessage],
        messages: [...state.messages, new AIMessage({ content: `Error enhancing prompt: ${errorMessage}` })],
        validationStatus: 'failure', // Prevent further steps if enhancement fails
    };
  }
}