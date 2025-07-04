import { Voice } from "@/store/params.store";

export const VOICES: Voice[] = [
  {
    name: "Guillaume",
    voiceId: "Qrl71rx6Yg8RvyPYRGCQ",
  },
  {
    name: "Angela",
    voiceId: "PT4nqlKZfc06VW1BuClj",
  },
];

export async function GET() {
  try {
    const voicePromises = VOICES.map((voice) =>
      fetch(`https://api.elevenlabs.io/v1/voices/${voice.voiceId}`, {
        method: "GET",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY as string,
        },
      }),
    );

    const responses = await Promise.all(voicePromises);
    const voicesData = await Promise.all(
      responses.map((response) => response.json()),
    );

    const ensureVoices = voicesData.filter((voice) => voice.voice_id);

    return Response.json(ensureVoices);
  } catch (error) {
    throw error;
  }
}
