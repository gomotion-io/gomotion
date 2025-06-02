// src/nodes/validateCodeNode.ts
import { RemotionAgentState } from '../state';
import { validateRemotionCode } from '../tools/remotionExecution';
import { RemotionAgentConfig } from '../types';
import { HumanMessage } from '@langchain/core/messages'; // Could be a ToolMessage

export async function validateCodeNode(
  state: RemotionAgentState,
  config: Required<RemotionAgentConfig>
): Promise<Partial<RemotionAgentState>> {
  console.log("--- Validating Remotion Code ---");

  if (!state.generatedCode) {
    console.error("No code generated to validate.");
    return {
      validationStatus: 'failure',
      currentErrors: ["No code was available for validation."],
      validationLog: [...state.validationLog, "Validation skipped: No code generated."],
    };
  }

  if (!state.animationConfig) {
    console.error("Animation configuration (compositionId, etc.) is missing. Cannot validate.");
     return {
      validationStatus: 'failure',
      currentErrors: ["Animation configuration missing, cannot determine composition ID for validation."],
      validationLog: [...state.validationLog, "Validation skipped: Animation configuration missing."],
    };
  }
  
  const { compositionId } = state.animationConfig;

  try {
    const result = await validateRemotionCode(
      state.generatedCode,
      compositionId,
      config.codeValidation,
      state.sessionId
    );

    const newValidationLogEntry = `Attempt ${state.totalAttempts}:\n${result.logOutput}`;

    if (result.success) {
      console.log("Code validation successful.");
      return {
        validationStatus: 'success',
        finalCode: state.generatedCode, // Code is good!
        currentErrors: [], // Clear errors on success
        validationLog: [...state.validationLog, newValidationLogEntry],
        messages: [...state.messages, new HumanMessage({content: `Code validation successful. Log: ${result.logOutput.substring(0,200)}...`})] // Or ToolMessage
      };
    } else {
      console.error(`Code validation failed. Error: ${result.error || 'Unknown validation error'}`);
      const errorMessages = result.error ? [result.error] : ["Unknown validation error during Remotion execution."];
      
      // Extract more specific errors from logs if possible (very basic example)
      const tscErrorMatch = result.logOutput.match(/error TS\d+:[^\n]+/g);
      if (tscErrorMatch) {
        errorMessages.push(...tscErrorMatch);
      }
      const remotionErrorMatch = result.logOutput.match(/Remotion CLI failed:[^\n]+/i);
      if(remotionErrorMatch && remotionErrorMatch[0] && !errorMessages.some(e => e.includes(remotionErrorMatch[0]))) {
        errorMessages.push(remotionErrorMatch[0]);
      }


      return {
        validationStatus: 'failure',
        finalCode: null, // Code is not good yet
        currentErrors: errorMessages,
        validationLog: [...state.validationLog, newValidationLogEntry],
        messages: [...state.messages, new HumanMessage({content: `Code validation FAILED. Error: ${result.error?.substring(0,200)}... Log: ${result.logOutput.substring(0,200)}...`})]
      };
    }
  } catch (error: any) {
    console.error("Unexpected error in validateCodeNode:", error);
    const errorMessage = `Critical error during code validation process: ${error.message}`;
    return {
      validationStatus: 'failure',
      finalCode: null,
      currentErrors: [errorMessage],
      validationLog: [...state.validationLog, `Attempt ${state.totalAttempts}: ${errorMessage}`],
      messages: [...state.messages, new HumanMessage({content: errorMessage})]
    };
  }
}