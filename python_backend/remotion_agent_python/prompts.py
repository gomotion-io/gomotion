from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from .config import RemotionAgentConfig
import re

# Helper to extract animation parameters from the enhanced prompt
def extract_animation_parameters(enhanced_prompt_text: str, defaults: dict) -> dict:
    params = {
        "compositionId": defaults.get("defaultCompositionId", "MainComposition"),
        "durationInFrames": defaults.get("durationInFrames", 150), # e.g., 5s at 30fps
        "fps": defaults.get("fps", 30),
        "width": defaults.get("width", 1920),
        "height": defaults.get("height", 1080),
    }
    
    # Example line: "Duration: 90 frames, FPS: 30, Width: 1920, Height: 1080."
    # Or "CompositionID: MyAnim, Duration: 120 frames, FPS: 60, Width: 1280, Height: 720."
    
    duration_match = re.search(r"Duration:\s*(\d+)\s*frames", enhanced_prompt_text, re.IGNORECASE)
    if duration_match:
        params["durationInFrames"] = int(duration_match.group(1))
        
    fps_match = re.search(r"FPS:\s*(\d+)", enhanced_prompt_text, re.IGNORECASE)
    if fps_match:
        params["fps"] = int(fps_match.group(1))
        
    width_match = re.search(r"Width:\s*(\d+)", enhanced_prompt_text, re.IGNORECASE)
    if width_match:
        params["width"] = int(width_match.group(1))
        
    height_match = re.search(r"Height:\s*(\d+)", enhanced_prompt_text, re.IGNORECASE)
    if height_match:
        params["height"] = int(height_match.group(1))

    id_match = re.search(r"compositionID:\s*([\w-]+)", enhanced_prompt_text, re.IGNORECASE)
    if id_match:
        params["compositionId"] = id_match.group(1)
        
    return params


def get_enhance_prompt_template(config: RemotionAgentConfig) -> ChatPromptTemplate:
    code_validation_config = config.get("codeValidation", {})
    default_composition_id = code_validation_config.get("defaultCompositionId", "MainComposition")
    video_file_name = code_validation_config.get("videoFileName", "MyVideo.tsx")

    system_template = """You are an expert motion graphics designer and Remotion developer.
Your task is to rewrite and significantly enhance the user's prompt for an AI that generates Remotion (React/TypeScript) code.
The goal is to make the prompt highly detailed and specific, guiding the AI to produce high-quality, "Adobe After Effects style" animations.

Focus on these aspects:
1.  **Animation Concept**: Clarify the core idea. If the user asks for "After Effects style", interpret this.
2.  **"After Effects Style" Concretization**: Translate this into Remotion techniques:
    *   Easing & Timing: Suggest `interpolate`, `spring` (with specific `stiffness`, `damping`, `mass`), `Easing` functions. Emphasize smooth motion, anticipation, overshoot.
    *   Layering & Composition: `<AbsoluteFill>`, `<Sequence>`, visual hierarchy.
    *   Kinetic Typography: Dynamic text animations (per-letter/word, reveals).
    *   Visuals: Shapes, subtle glows (CSS `box-shadow`/`filter`), blurs (CSS `filter`), purposeful transitions.
    *   Professionalism: Clean design, good contrast, deliberate motion.
3.  **Technical Specifications (Provide these defaults if not inferable from user prompt, AND ALWAYS STATE THEM CLEARLY):**
    *   `compositionID`: Define a clear ID. Default to """ + default_composition_id + """. This ID MUST be used in the `<Composition id="...">` tag if the AI were to generate that (it won't, but it's for context).
    *   Dimensions: Default to 1920x1080.
    *   Duration: Default to 3–5 seconds (e.g., 90–150 frames at 30 FPS).
    *   FPS: Default to 30 FPS.
    Ensure one line in your output explicitly states these: "CompositionID: [ID], Duration: [X] frames, FPS: [Y], Width: [W], Height: [H]."
4.  **Code Structure Reminder for the AI that will generate code**:
    *   The AI must generate a single, self-contained TSX file intended for `src/"""+video_file_name+"""`.
    *   It MUST include all necessary imports (`React`, `AbsoluteFill`, `interpolate`, `useCurrentFrame`, `useVideoConfig`, `Sequence`, `spring`, `Easing`, etc.).
    *   The main animation component must be named `GeneratedComp`.
    *   Export the component as both named export (`export const GeneratedComp: React.FC = () => {{ return {{...}}; }};`) and default export (`export default GeneratedComp;`).
    *   Do NOT export any composition configuration or root components.

Output ONLY the new, enhanced prompt for the code generation AI. Do NOT add any conversational fluff before or after the prompt.
The enhanced prompt must contain all the necessary details including the explicit line for duration, FPS, width, and height.
Example of the specification line in enhanced prompt:
"CompositionID: CoolIntro, Duration: 90 frames, FPS: 30, Width: 1920, Height: 1080."
"""
    return ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template(system_template),
        HumanMessagePromptTemplate.from_template("Original user prompt: {userPrompt}"),
    ])

def get_generate_code_prompt_template(config: RemotionAgentConfig) -> ChatPromptTemplate:
    code_validation_config = config.get("codeValidation", {})
    video_file_name = code_validation_config.get("videoFileName", "MyVideo.tsx")

    system_template = """You are an expert Remotion (React/TypeScript) developer.
Your goal is to generate a single, self-contained, and fully functional TSX file for a Remotion animation based on the provided requirements.
The file will be saved as `src/"""+video_file_name+"""`.

**Key Instructions for Code Generation:**
1.  **Single File Output**: All code must be in one TSX file.
2.  **Self-Contained**: Include ALL necessary imports from 'remotion', 'react', and any other standard libraries.
3.  **Component Structure**: 
    *   Create ONE main React functional component named `GeneratedComp`.
    *   Export it as both named export: `export const GeneratedComp: React.FC = () => {{ return {{...}}; }};`
    *   And default export: `export default GeneratedComp;`
    *   Do NOT export any composition configuration, root components, or RemotionRoot components.
4.  **"After Effects Style"**: Implement suggestions for smooth, professional motion using Remotion's `spring`, `interpolate`, `Easing`, `<Sequence>`, transforms, opacity, etc.
5.  **Clarity & Best Practices**: Write clean, readable, and well-structured TypeScript code. Follow Remotion best practices.
6.  **No External Assets**: Do NOT use `staticFile()` or try to load external images/videos unless explicitly asked and a placeholder mechanism is acceptable and detailed in the prompt. Assume all visuals are generated with code.
7.  **Error-Free**: Strive for code that is free of TypeScript compilation errors and runtime errors.

**Input Format:**
You will receive:
- User Requirements / Enhanced Prompt: Detailed specifications for the animation.
- Relevant Documentation (Optional): Snippets from Remotion docs that might be helpful.
- Previous Errors (If any): If this is a retry, you'll get error messages from the last failed attempt. FIX THESE ERRORS.

**Output Format:**
Respond ONLY with the complete TSX code for the `src/"""+video_file_name+"""` file. Do NOT include any explanations, apologies, or conversational text before or after the code block. Do NOT use markdown code fences (e.g., ```tsx```). Just the raw code.

**Required Code Structure Example:**

import React from 'react';
import {{ useCurrentFrame, interpolate, useVideoConfig }} from 'remotion';

export const GeneratedComp: React.FC = () => {{
const frame = useCurrentFrame();
const {{ fps, width, height }} = useVideoConfig();

// Your animation logic here

return (
<div>
{{/* Your animation content here */}}
</div>
);
}};

export default GeneratedComp;
"""
    
    human_template = """User Requirements / Enhanced Prompt:
{enhancedPrompt}

{ragContextSection}
{errorSection}
Please generate the Remotion TSX code now."""
    
    return ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template(system_template),
        HumanMessagePromptTemplate.from_template(human_template),
    ])