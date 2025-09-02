// Import config to ensure AI provider is set up
import "./utils/config";

// Export the main workflow
export { createAnimationWorkflow } from "./workflow";
export type { AnimationWorkflowResult } from "./workflow";

// Export individual components for advanced usage
export { checkSuccess } from "./steps/create-animation/check-success";
export { createAnimation } from "./steps/create-animation/create-animation";

// Export types
export type { CheckSuccessOutput } from "./steps/create-animation/check-success";
export type {
  CreateAnimationInput,
  CreateAnimationOutput,
} from "./steps/create-animation/types";

// Export animator agent
export { animatorAgent } from "./agents/animator";
export type {
  AnimatorInput,
  AnimatorOutput,
  Context,
} from "./agents/animator/types";

// Export utilities
export { testRenderStill } from "./utils/render-code";
export type { Generated } from "./utils/render-code";
