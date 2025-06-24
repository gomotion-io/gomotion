export async function GET() {
  const response = await fetch(
    `${process.env.MASTRA_URL}/api/workflows/remotionWorkflow/watch`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );

  return await response.json();
}
