import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  const safePrompt =
    (prompt as string | undefined)?.replace(/`/g, "'") ?? "Hello, Remotion!";

  /* ----------------- sample ----------------- */
  const tsx = `import React from 'react';

export const GeneratedComp: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', fontSize: 100, fontFamily: 'sans-serif' }}>
      <span style={{color: 'red'}}>${safePrompt}</span>
    </div>
  );
};

export default GeneratedComp;`;
  /* -----------------  ----------------- */

  return Response.json({
    tsx,
    metadata: {
      comp_with: 1920,
      comp_height: 1080,
      fps: 60,
      duration_in_frames: 300,
    },
  });
}
