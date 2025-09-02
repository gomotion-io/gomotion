import { getMandatoryInstructions } from "./mandatory";
import { compatibleFonts } from "./mandatory/fonts";

export const getRemixPrompt = (previousVideo: string) => `

# Remix Mode

You are now in remix mode. You will modify an existing Remotion project based on the user's requested changes.

The previous video project (in the required JSON format) is:

${previousVideo}

The user will describe the changes they want in natural language.

### **TASK** : 
1. Analyze the user's change request carefully.
2. Identify which parts of the existing project need to be modified.
3. Generate a new JSON object conforming to the same schema.
4. Implement ONLY the requested changes precisely, without altering anything else.
5. Preserve ALL of the original structure, style, animations, and code. Copy the code verbatim for all unchanged parts. Do not rewrite, refactor, or modify any code unless it is strictly necessary to implement the user's specific request.
6. If changes affect timings, durations, or meta, update them accordingly, but keep changes minimal.
7. Ensure the output remains production-grade, following all guidelines from the base prompt.
8. If the user's request is unclear, make reasonable assumptions while staying true to the original, preferring to change as little as possible.

### **CONSISTENCY RULES** :
- Maintain full consistency across scenes: Do not change background colors, fonts, layouts, animations, or any visual/audio elements unless explicitly requested.
- Assess request specificity:
  - For precise changes (e.g., "change the font size to 40px"), modify ONLY that exact property in the relevant place.
  - For broader changes (e.g., "make the animation more dynamic with kinetic effects"), introduce appropriate modifications while preserving the original style, structure, and unchanged elements.
- Always copy code verbatim for all unchanged sections. Do not rephrase, optimize, or alter unrelated code.
- If a change requires adjustments (e.g., to timings or positions), make only the minimal updates necessary.
- Example: User request: "Change the text color to blue". Find the relevant style object (e.g., color: 'red') and change ONLY to color: 'blue'. Do not touch fontSize, fontFamily, etc.
- Example: User request: "Add a glitch effect to the title". Add the glitch animation code to the title element only, without changing its color, size, or other properties unless specified.

### **MANDATORY INSTRUCTIONS** : 

${getMandatoryInstructions({ fonts: compatibleFonts })}
`;
