const VOICES = [
  {
    name: "Mark",
    voice_id: "1SM7GgM6IMuvQlz2BwM3",
  },
  {
    name: "Hope",
    voice_id: "tnSpp4vdxKPjI9w0GnoV",
  },
  {
    name: "Guillaume",
    voice_id: "Qrl71rx6Yg8RvyPYRGCQ",
  },
  {
    name: "Gaëlle",
    voice_id: "WLKp2jV6nrS8aMkPPDRO",
  },
  {
    name: "Paul",
    voice_id: "tKaoyJLW05zqV0tIH9FD",
  },
  {
    name: "Emilia",
    voice_id: "ZF6FPAbjXT4488VcRRnw",
  },
];

export async function GET() {
  try {
    const voicePromises = VOICES.map((voice) =>
      fetch(`https://api.elevenlabs.io/v1/voices/${voice.voice_id}`, {
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
