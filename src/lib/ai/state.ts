// src/state.ts
import { BaseMessage } from "@langchain/core/messages";
import { v4 as uuidv4 } from 'uuid';

export interface RemotionAgentState {
  sessionId: string;
  originalPrompt: string;
  enhancedPrompt: string | null;
  
  // RAG related
  ragContext: string | null;
  
  // Code generation and validation
  generatedCode: string | null;
  validationLog: string[]; // For stdout/stderr from validation attempts
  validationStatus: 'pending' | 'success' | 'failure';
  
  // Error handling and retries
  currentErrors: string[]; // Errors from the latest validation attempt
  totalAttempts: number; // Total generation attempts (1 initial + retries)
  
  // Final output
  finalCode: string | null;
  finalUserMessage: string | null; // Message for user if process fails overall
  
  // For conversational context if nodes use LLMs that benefit from it
  // (Not heavily used in this direct generation flow, but good for future)
  messages: BaseMessage[]; 

    animationConfig: AnimationParameters | null; // Add this to the interface

}

export interface AnimationParameters {
    compositionId: string;
    durationInFrames: number;
    fps: number;
    width: number;
    height: number;
  }
 
export function getInitialState(): Omit<RemotionAgentState, 'originalPrompt' | 'sessionId'> {
  return {
    enhancedPrompt: null,
    ragContext: null,
    generatedCode: null,
    validationLog: [],
    validationStatus: 'pending',
    currentErrors: [],
    totalAttempts: 0,
    finalCode: null,
    finalUserMessage: null,
    messages: [],
animationConfig: null,

  };
}