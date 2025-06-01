import { NextRequest } from "next/server";
import { hello_example } from "@/app/api/generate/example";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  const safePrompt =
    (prompt as string | undefined)?.replace(/`/g, "'") ?? "Hello, Remotion!";

  const { tsx, metadata } = hello_example(safePrompt);

  return Response.json({ tsx, metadata });
}
