// src/index.ts
import { RemotionAgent } from './agent';
import { RemotionAgentConfig, AgentResult } from './types';

export { RemotionAgent };
export type { RemotionAgentConfig, AgentResult };

export async function createRemotionAgent(
  config: RemotionAgentConfig
): Promise<RemotionAgent> {
  const agent = new RemotionAgent(config);
  await agent.initialize(); // Initialize RAG etc.
  return agent;
}

// Example Usage (optional, for testing)
// async function main() {
//   if (!process.env.OPENAI_API_KEY) {
//     throw new Error("OPENAI_API_KEY environment variable is not set.");
//   }

//   const agent = await createRemotionAgent({
//     openaiApiKey: process.env.OPENAI_API_KEY,
//     // You can override other default configs here
//     // codeValidation: { tempDir: './custom_temp' }
//   });

//   const userPrompt = "Create a simple text animation saying 'Hello Remotion Agent!' that fades in and scales up. Duration 3 seconds. Professional and smooth.";
//   // const userPrompt = "A red square that moves from left to right across the screen over 2 seconds. Background is black.";

//   console.log(`Requesting animation for: "${userPrompt}"`);
//   const result = await agent.generateRemotionCode(userPrompt);

//   console.log("\n--- Agent Run Complete ---");
//   if (result.success && result.finalCode) {
//     console.log("\n✅ Successfully generated and validated Remotion TSX Code:\n");
//     console.log("=" * 30 + " START CODE " + "=" * 30);
//     console.log(result.finalCode);
//     console.log("=" * 30 + "  END CODE  " + "=" * 30);
//   } else {
//     console.log("\n❌ Agent failed to produce working Remotion code.");
//     console.log("Total Attempts:", result.totalAttempts);
//     if (result.errors.length > 0) {
//       console.log("Last Errors Encountered:");
//       result.errors.forEach(err => console.log("- ", err.substring(0, 500) + "..."));
//     }
//     // console.log("\nValidation Log (last entries):");
//     // result.validationLog.slice(-5).forEach(log => console.log(log.substring(0, 300) + "..."));
//   }
// }

// if (require.main === module) {
//   main().catch(console.error);
// }