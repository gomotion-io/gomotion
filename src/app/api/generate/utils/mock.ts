export const mock: Omit<Video, "id"> = {
  created_at: new Date().toISOString(),
  name: "Hello World",
  profile_id: "8ca7f1bc-35f7-4810-99de-58795c9697ff",
  width: 1920,
  height: 1080,
  fps: 30,
  duration_in_frames: 90,
  tsx: `import React from 'react';

export const GeneratedComp: React.FC = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#000',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        fontSize: 72,
        color: '#fff',
        margin: 0
      }}>
        hello world
      </h1>
    </div>
  );
};

export default GeneratedComp;`,
};
