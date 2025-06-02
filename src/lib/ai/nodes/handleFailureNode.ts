// src/nodes/handleFailureNode.ts
import { RemotionAgentState } from '../state';
import { AIMessage } from '@langchain/core/messages';

export function handleFailureNode(state: RemotionAgentState): Partial<RemotionAgentState> {
  console.log("--- Max Retries Reached or Unrecoverable Error ---");
  
  let failureMessage = `Agent failed to generate working Remotion code for session ${state.sessionId}.`;
  if (state.totalAttempts > 0) {
    failureMessage += ` Total attempts: ${state.totalAttempts}.`;
  }

  if (state.currentErrors && state.currentErrors.length > 0) {
    failureMessage += `\nLast known errors:\n- ${state.currentErrors.join("\n- ").substring(0, 1000)}...`;
  } else if (state.validationLog && state.validationLog.length > 0) {
    failureMessage += `\nLast validation log entry (summary):\n${state.validationLog[state.validationLog.length -1].substring(0,1000)}...`;
  } else {
    failureMessage += "\nNo specific error details available from the last step."
  }
  
  console.warn(failureMessage);

  return {
    finalCode: null, // Explicitly null
    finalUserMessage: failureMessage, // For the user/caller
    messages: [...state.messages, new AIMessage({ content: failureMessage })]
  };
}