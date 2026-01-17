import dotenv from "dotenv";
import { createAnimationWorkflow } from "./g-zero";

dotenv.config();

/**
 * Example usage of the animation workflow
 */
async function runAnimationExample() {
  console.log("Starting animation workflow example...");

  const result = await createAnimationWorkflow({
    instruction: "Create a simple bouncing ball animation",
    metadata: "width: 1080, height: 1920, fps: 30",
    contextModel: "classic",
    model: "anthropic/claude-sonnet-4",
    voiceId: "ZF6FPAbjXT4488VcRRnw",
    apiKey: process.env.OPENROUTER_API_KEY || "",
  });

  if (result.success) {
    console.log("✅ Animation created successfully!");
    console.log("Output:", result.output);
    console.log(`Completed in ${result.attempts} attempts`);
  } else {
    console.error("❌ Animation creation failed:");
    console.error("Error:", result.error);
    console.log(`Failed after ${result.attempts} attempts`);
  }
}

// Export for potential external usage
export { runAnimationExample };

// Run the example if this file is executed directly
if (require.main === module) {
  runAnimationExample().catch(console.error);
}
