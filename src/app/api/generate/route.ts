import { NextRequest } from "next/server";
import { fireship_reel_example } from "./example";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  console.log("Prompt:", prompt);

  const { tsx, metadata } = fireship_reel_example();

  return Response.json({ tsx, metadata });
}
