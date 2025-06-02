import { NextRequest } from "next/server";
import { particle_burst_example } from "@/app/api/generate/example";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  const safePrompt =
    (prompt as string | undefined)?.replace(/`/g, "'") ?? "Hello, Remotion!";

  const { tsx, metadata } = particle_burst_example(safePrompt);

  return Response.json({ tsx, metadata });
}
