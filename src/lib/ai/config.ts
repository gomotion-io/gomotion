// src/config.ts
import { RemotionAgentConfig } from './types';

export const DEFAULT_CONFIG: Omit<RemotionAgentConfig, 'openaiApiKey'> = {
  llm: {
    modelName: "gpt-4-turbo-preview", // Consider GPT-4 for quality
    temperature: 0.1,
    maxTokens: 4000,
  },
  rag: {
    enabled: true,
    chunkSize: 1500,
    chunkOverlap: 200,
    maxRetrievedDocs: 5,
    documentUrls: [
      "https://www.remotion.dev/docs",
      "https://www.remotion.dev/docs/api",
      "https://www.remotion.dev/docs/composition",
      "https://www.remotion.dev/docs/sequence",
      "https://www.remotion.dev/docs/spring",
      "https://www.remotion.dev/docs/interpolate",
      "https://www.remotion.dev/docs/use-current-frame",
      "https://www.remotion.dev/docs/easing",
      "https://www.remotion.dev/docs/props",
      "https://www.remotion.dev/docs/video-config",
      // Add more key URLs as needed
    ],
  },
  errorHandling: {
    maxRetries: 2, // Number of retries *after* the first attempt
  },
  codeValidation: {
    tempDir: './remotion_agent_temp',
    cleanupAfterTest: true,
    remotionLogLevel: 'verbose',
    defaultCompositionId: 'MainComposition',
    videoFileName: 'MyVideo.tsx',
    npmInstallTimeout: 180000, // 3 minutes
    remotionRenderTimeout: 120000, // 2 minutes
  },
};

// Helper to merge user config with defaults
export function getConfig(userConfig: RemotionAgentConfig): Required<RemotionAgentConfig> {
  return {
    openaiApiKey: userConfig.openaiApiKey,
    llm: {
      ...DEFAULT_CONFIG.llm,
      ...(userConfig.llm || {}),
    },
    rag: {
      ...DEFAULT_CONFIG.rag,
      ...(userConfig.rag || {}),
    },
    errorHandling: {
      ...DEFAULT_CONFIG.errorHandling,
      ...(userConfig.errorHandling || {}),
    },
    codeValidation: {
      ...DEFAULT_CONFIG.codeValidation,
      ...(userConfig.codeValidation || {}),
    },
  };
}