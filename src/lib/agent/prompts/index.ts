import { Context } from "../types";
import { getClassicPrompt } from "./classic";
import { getCreativePrompt } from "./creative";
import { getNarrativePrompt } from "./narrative";
import { getRemixPrompt } from "./remix";

type GetPromptInput = {
  contextModel: Context;
  previousCode?: string;
};

type GetPromptOutput = {
  prompt: string;
};

export const getAnimatorPrompt = (input: GetPromptInput): GetPromptOutput => {
  if (input.previousCode) {
    return {
      prompt: getRemixPrompt(JSON.stringify(input.previousCode)),
    };
  }

  switch (input.contextModel) {
    case "classic":
      return { prompt: getClassicPrompt() };
    case "creative":
      return { prompt: getCreativePrompt() };
    case "narrative":
      return { prompt: getNarrativePrompt() };
    default:
      return { prompt: getClassicPrompt() };
  }
};
