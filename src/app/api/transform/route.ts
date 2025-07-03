import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { tsx } = await request.json();

    if (!tsx || typeof tsx !== "string") {
      return Response.json({ error: "TSX code is required" }, { status: 400 });
    }

    // Dynamic import to avoid webpack bundling issues
    const { transform } = await import("esbuild");

    // Transform TSX to JavaScript using esbuild
    const result = await transform(tsx, {
      loader: "tsx",
      format: "esm",
      jsx: "transform",
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
    });

    // Patch the transformed code so that React and Remotion are expected
    // to be provided globally by the client (window.React / window.Remotion).
    const patchedCode = getPatchedCode(result.code);

    return Response.json({ code: patchedCode });
  } catch (error) {
    console.error("Esbuild transform error:", error);
    return Response.json(
      { error: "Failed to transform TSX code" },
      { status: 500 },
    );
  }
}

const getPatchedCode = (code: string) => {
  const moduleDefinitions = `
// Make React and Remotion available as globals
const React = window.React;
const Remotion = window.Remotion;

// Extract commonly used Remotion functions for convenience
const { useCurrentFrame, interpolate, spring, useVideoConfig, Sequence, Easing, Img, AbsoluteFill, Video } = window.Remotion;
`;

  return (
    moduleDefinitions +
    "\n" +
    code.replace(
      /import\s+(?:\*\s+as\s+\w+|\{[^}]*\}|\w+)\s+from\s+['"][^'"]*['"];?\s*/g,
      "// Import handled globally\n",
    )
  );
};
