import { Context } from "../types";
import { getClassicPrompt } from "./get-classic-prompt";
import { getCreativePrompt } from "./get-creative-prompt";
import { getNarrativePrompt } from "./get-narrative-prompts";
import { getRemixPrompt } from "./get-remix-prompt";

type AnimatorPromptInput = {
  contextModel: Context;
  previousCode?: string;
};

type AnimatorPromptOutput = {
  prompt: string;
};

export const getAnimatorPrompt = (
  input: AnimatorPromptInput
): AnimatorPromptOutput => {
  if (input.previousCode) {
    return {
      prompt: getRemixPrompt(input.previousCode),
    };
  }

  if (input.contextModel === "classic") {
    return {
      prompt: getClassicPrompt(),
    };
  }

  if (input.contextModel === "creative") {
    return {
      prompt: getCreativePrompt(),
    };
  }

  if (input.contextModel === "narrative") {
    return {
      prompt: getNarrativePrompt(),
    };
  }

  return {
    prompt: "",
  };
};
