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

    return Response.json({ code: result.code });
  } catch (error) {
    console.error("Esbuild transform error:", error);
    return Response.json(
      { error: "Failed to transform TSX code" },
      { status: 500 },
    );
  }
}
