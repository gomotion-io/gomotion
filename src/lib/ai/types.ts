// src/types.ts
import { BaseMessage } from "@langchain/core/messages";

export interface RemotionAgentConfig {
  openaiApiKey: string;
  llm?: {
    modelName?: string;
    temperature?: number;
    maxTokens?: number;
  };
  rag?: {
    enabled?: boolean;
    chunkSize?: number;
    chunkOverlap?: number;
    maxRetrievedDocs?: number;
    documentUrls?: string[];
  };
  errorHandling?: {
    maxRetries?: number;
  };
  codeValidation?: {
    tempDir?: string;
    cleanupAfterTest?: boolean;
    remotionLogLevel?: 'quiet' | 'info' | 'verbose';
    defaultCompositionId?: string; // Used if not extracted from enhanced prompt
    videoFileName?: string; // e.g., "MyVideo.tsx"
    npmInstallTimeout?: number; // in milliseconds
    remotionRenderTimeout?: number; // in milliseconds
  };
}

export interface AgentResult {
  success: boolean;
  finalCode: string | null;
  enhancedPrompt: string | null;
  errors: string[];
  validationLog: string[]; // To store messages from validation attempts
  totalAttempts: number;
  messageHistory?: BaseMessage[]; // Optional: for debugging or conversational context
}