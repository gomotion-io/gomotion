export async function getGenerationStatus() {
  const response = await fetch(
    `${process.env.MASTRA_URL}/api/workflows/remotionWorkflow/watch`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );

  return await response.json();
}
