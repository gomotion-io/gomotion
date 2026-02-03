import { WORKFLOW_ID } from "@/constant";

const WAIT_TIME = 5000; // 5 seconds
const MAX_ATTEMPTS = 600; // 10 minutes at 5s intervals

export async function pollMastraRun(
  runId: string
): Promise<{ result: { output: string } }> {
  const agentUrl = process.env.MASTRA_AGENT_URL;
  if (!agentUrl) {
    throw new Error("MASTRA_AGENT_URL environment variable is not set");
  }

  let attempts = 0;

  console.log(`[pollMastraRun] Start polling for runId: ${runId}`);

  while (attempts < MAX_ATTEMPTS) {
    console.log(
      `[pollMastraRun] Poll attempt ${attempts + 1} for runId: ${runId}`
    );
    const statusResponse = await fetch(
      `${agentUrl}/workflows/${WORKFLOW_ID}/runs/${runId}`
    );
    const statusData = await statusResponse.json();
    const status = statusData.snapshot?.status;

    console.log(`[pollMastraRun] Status for runId ${runId}: ${status}`);

    if (status === "success") {
      console.log(
        `[pollMastraRun] RunId ${runId} succeeded. Fetching execution result.`
      );
      const resultResponse = await fetch(
        `${agentUrl}/workflows/${WORKFLOW_ID}/runs/${runId}/execution-result`
      );
      if (!resultResponse.ok) {
        const errorText = await resultResponse.text();
        console.error(
          `[pollMastraRun] Failed to fetch execution result for runId ${runId}: ${resultResponse.status} - ${errorText}`
        );
        throw new Error(
          `Failed to fetch execution result: ${resultResponse.status} - ${errorText}`
        );
      }
      const result = await resultResponse.json();
      console.log(
        `[pollMastraRun] Execution result for runId ${runId} received.`
      );
      return result;
    } else if (status === "failed" || status === "error") {
      console.error(
        `[pollMastraRun] RunId ${runId} failed with status: ${status}`
      );
      throw new Error(`Run failed with status: ${status}`);
    }

    // Wait 5 seconds before next poll
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    attempts++;
  }

  console.error(
    `[pollMastraRun] Polling timeout: RunId ${runId} did not complete in time`
  );
  throw new Error("Polling timeout: Run did not complete in time");
}
