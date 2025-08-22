import { WORKFLOW_ID } from "@/constant";

export async function pollMastraRun(
  runId: string
): Promise<{ result: { output: string } }> {
  const agentUrl = process.env.MASTRA_AGENT_URL;
  if (!agentUrl) {
    throw new Error("MASTRA_AGENT_URL environment variable is not set");
  }

  const maxAttempts = 300; // 5 minutes at 5s intervals
  let attempts = 0;

  while (attempts < maxAttempts) {
    const statusResponse = await fetch(
      `${agentUrl}/workflows/${WORKFLOW_ID}/runs/${runId}`
    );
    const statusData = await statusResponse.json();
    const status = statusData.snapshot?.status;

    if (status === "success") {
      const resultResponse = await fetch(
        `${agentUrl}/workflows/${WORKFLOW_ID}/runs/${runId}/execution-result`
      );
      if (!resultResponse.ok) {
        const errorText = await resultResponse.text();
        throw new Error(
          `Failed to fetch execution result: ${resultResponse.status} - ${errorText}`
        );
      }
      return await resultResponse.json();
    } else if (status === "failed" || status === "error") {
      throw new Error(`Run failed with status: ${status}`);
    }

    // Wait 1 second before next poll
    await new Promise((resolve) => setTimeout(resolve, 5000));
    attempts++;
  }

  throw new Error("Polling timeout: Run did not complete in time");
}
