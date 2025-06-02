/* ----------------- Particle burst animation with colorful particles ----------------- */
export const particle_burst_example = () => ({
  metadata: {
    width: 1920,
    height: 1080,
    fps: 60,
    duration_in_frames: 300,
  },
  tsx: `import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const GeneratedComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 2 * Math.PI;
    const distance = spring({
      frame: frame - 60,
      fps,
      config: { damping: 15, stiffness: 200 },
    }) * 300;
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    const opacity = interpolate(frame, [60, 100, 200, 240], [0, 1, 1, 0], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    });
    
    return { x, y, opacity, angle: angle * (180 / Math.PI) };
  });

  // Text animation
  const textScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 300 },
  });

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#0a0a0a',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: \`hsl(\${index * 18}, 80%, 60%)\`,
            transform: \`translate(\${particle.x}px, \${particle.y}px)\`,
            opacity: particle.opacity,
          }}
        />
      ))}
      
      {/* Central text */}
      <div style={{
        textAlign: 'center',
        transform: \`scale(\${textScale})\`,
        zIndex: 10,
      }}>
        <h1 style={{
          fontSize: 72,
          fontWeight: 'bold',
          color: 'white',
          margin: 0,
          textShadow: '0 0 20px rgba(255,255,255,0.5)',
        }}>
          hello world
        </h1>
      </div>
    </div>
  );
};

export default GeneratedComp;`,
});

/* ----------------- Morphing shapes with color cycling ----------------- */
export const morphing_shapes_example = () => ({
  metadata: {
    width: 1920,
    height: 1080,
    fps: 60,
    duration_in_frames: 360,
  },
  tsx: `import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion';

export const GeneratedComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Morphing animation for shapes
  const morphProgress = interpolate(frame, [0, 180, 360], [0, 1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  
  const borderRadius = interpolate(morphProgress, [0, 1], [0, 50]);
  const rotation = interpolate(frame, [0, 360], [0, 720]);
  
  // Color cycling
  const hue = interpolate(frame, [0, 360], [0, 360]);
  
  // Spring animation for text
  const textSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: \`radial-gradient(circle, hsl(\${hue}, 30%, 10%) 0%, hsl(\${hue + 60}, 20%, 5%) 100%)\`,
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Morphing background shapes */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 200 - i * 30,
            height: 200 - i * 30,
            borderRadius: \`\${borderRadius + i * 10}%\`,
            border: \`2px solid hsla(\${hue + i * 72}, 70%, 60%, 0.3)\`,
            transform: \`rotate(\${rotation + i * 72}deg)\`,
            animation: 'none',
          }}
        />
      ))}
      
      {/* Animated text */}
      <Sequence from={60}>
        <div style={{
          textAlign: 'center',
          transform: \`scale(\${textSpring}) rotate(\${rotation * 0.1}deg)\`,
          zIndex: 10,
        }}>
          <h1 style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: \`hsl(\${hue}, 80%, 90%)\`,
            margin: 0,
            textShadow: \`0 0 30px hsl(\${hue}, 80%, 60%)\`,
            letterSpacing: '2px',
          }}>
            hello world
          </h1>
        </div>
      </Sequence>
    </div>
  );
};

export default GeneratedComp;`,
});

/* ----------------- Text-over-voice-over Reel style with rapid transitions ----------------- */
export const text_over_voice_reel_example = () => ({
  metadata: {
    width: 1080,
    height: 1920,
    fps: 30,
    duration_in_frames: 450, // 15 seconds at 30fps
  },
  tsx: `import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Sequence, Img } from 'remotion';

export const GeneratedComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Define text sequences for rapid transitions
  const textSequences = [
    { text: "L'IA va changer", start: 0, duration: 45 },
    { text: "TOUT ce que vous savez", start: 45, duration: 45 },
    { text: "sur le travail", start: 90, duration: 45 },
    { text: "Voici pourquoi", start: 135, duration: 45 },
    { text: "hello world", start: 180, duration: 90 },
    { text: "Les développeurs", start: 270, duration: 45 },
    { text: "qui ignorent ça", start: 315, duration: 45 },
    { text: "seront remplacés", start: 360, duration: 90 },
  ];
  
  // Background images rotation
  const bgImages = [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=700&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&h=700&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1676573409897-8a0e9f60bc26?w=400&h=700&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1677756119517-756a188902a6?w=400&h=700&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1676299081721-9f7d2e5b9b4d?w=400&h=700&fit=crop&crop=center',
  ];
  
  const currentBgIndex = Math.floor(frame / 90) % bgImages.length;
  
  // Zoom effect for background
  const bgScale = interpolate(frame % 90, [0, 89], [1, 1.1], {
    extrapolateRight: 'clamp',
  });
  
  // Flash effect for transitions
  const flashOpacity = interpolate(frame % 45, [0, 3, 6], [0, 0.3, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  
  // Get current text
  const currentSequence = textSequences.find(seq => 
    frame >= seq.start && frame < seq.start + seq.duration
  );
  
  const textProgress = currentSequence ? 
    (frame - currentSequence.start) / currentSequence.duration : 0;
  
  // Text animations
  const textScale = spring({
    frame: frame - (currentSequence?.start || 0),
    fps,
    config: { damping: 20, stiffness: 300 },
  });
  
  const textOpacity = interpolate(textProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.8], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: \`scale(\${bgScale})\`,
        transformOrigin: 'center',
      }}>
        <Img
          src={bgImages[currentBgIndex]}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.4) contrast(1.2) saturate(1.1)',
          }}
        />
      </div>
      
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(20,20,40,0.7))',
      }} />
      
      {/* Flash transition effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'white',
        opacity: flashOpacity,
        pointerEvents: 'none',
      }} />
      
      {/* Animated geometric elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: 60,
        height: 60,
        border: '3px solid #00ff88',
        borderRadius: '50%',
        transform: \`rotate(\${frame * 2}deg)\`,
        opacity: 0.7,
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        width: 40,
        height: 40,
        background: '#ff3366',
        transform: \`rotate(\${frame * -1.5}deg) scale(\${1 + Math.sin(frame * 0.1) * 0.2})\`,
        opacity: 0.8,
      }} />
      
      {/* Main text container */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        textAlign: 'center',
        zIndex: 10,
      }}>
        {currentSequence && (
          <div style={{
            transform: \`scale(\${textScale})\`,
            opacity: textOpacity,
          }}>
            <h1 style={{
              fontSize: currentSequence.text.length > 20 ? 56 : 72,
              fontWeight: 900,
              color: 'white',
              margin: 0,
              lineHeight: 1.1,
              textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.2)',
              letterSpacing: '-1px',
              textTransform: 'uppercase',
              background: currentSequence.text === "hello world" ? 
                'linear-gradient(45deg, #00ff88, #0088ff, #ff3366)' : 'none',
              backgroundClip: currentSequence.text === "hello world" ? 'text' : 'initial',
              WebkitBackgroundClip: currentSequence.text === "hello world" ? 'text' : 'initial',
              WebkitTextFillColor: currentSequence.text === "hello world" ? 'transparent' : 'white',
            }}>
              {currentSequence.text}
            </h1>
          </div>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div style={{
        position: 'absolute',
        bottom: 100,
        left: '50%',
        transform: 'translateX(-50%)',
        width: interpolate(frame % 45, [0, 22, 45], [0, 200, 0]),
        height: 4,
        background: 'linear-gradient(90deg, #00ff88, #0088ff, #ff3366)',
        borderRadius: 2,
      }} />
      
      {/* Progress indicator */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40,
        height: 3,
        background: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <div style={{
          width: \`\${(frame / 450) * 100}%\`,
          height: '100%',
          background: 'linear-gradient(90deg, #00ff88, #0088ff)',
          borderRadius: 2,
        }} />
      </div>
    </div>
  );
};

export default GeneratedComp;`,
});

/* ----------------- ROPE Animation - Recreated from frames ----------------- */
export const rope_animation_example = () => ({
  metadata: {
    width: 1080,
    height: 1920,
    fps: 30,
    duration_in_frames: 300, // 10 seconds loop
  },
  tsx: `import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const GeneratedComp: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Text sequence based on the frames - each word shows for about 3-4 frames
  const textSequence = [
    "A",        // frames 0-3
    "IS",       // frames 4-7  
    "A",        // frames 8-11
    "IS",       // frames 12-15
    "YET",      // frames 16-19
    "ANOTHER",  // frames 20-23
    "ROPE",     // frames 24-27
    "TYPE",     // frames 28-31
    "ANOTHER",  // frames 32-35
    "YET",      // frames 36-39
  ];
  
  // Calculate current text index based on frame (cycle every 40 frames = ~1.33 seconds)
  const cycleLength = 40;
  const currentCycle = frame % cycleLength;
  const textIndex = Math.floor(currentCycle / 4) % textSequence.length;
  const currentText = textSequence[textIndex];
  
  // Text transition animation - quick fade for each word change
  const textProgress = (currentCycle % 4) / 4;
  const textOpacity = interpolate(textProgress, [0, 0.1, 0.9, 1], [0.7, 1, 1, 0.7]);
  
  // Subtle scale animation for text
  const textScale = interpolate(textProgress, [0, 0.5, 1], [0.98, 1.02, 0.98]);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#2a2b3e', // Dark blue-gray background
      fontFamily: "'Arial Black', Arial, sans-serif",
      position: 'relative',
      gap: '60px',
    }}>
      
      {/* Header with purple background */}
      <div style={{
        backgroundColor: '#8b5cf6', // Purple background
        padding: '20px 60px',
        borderRadius: '0px', // Rectangular shape like in frames
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 72,
          fontWeight: 900,
          color: '#000000', // Black text
          margin: 0,
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          3. ROPE
        </h1>
      </div>
      
      {/* Animated text below */}
      <div style={{
        textAlign: 'center',
        transform: \`scale(\${textScale})\`,
        opacity: textOpacity,
      }}>
        <h2 style={{
          fontSize: currentText.length > 6 ? 64 : 96, // Smaller font for longer words
          fontWeight: 900,
          color: '#ffffff', // White text
          margin: 0,
          letterSpacing: currentText.length > 6 ? '1px' : '4px',
          textTransform: 'uppercase',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}>
          {currentText}
        </h2>
      </div>
    </div>
  );
};

export default GeneratedComp;`,
});

/* ----------------- Bouncing Ball with Ulife Text Animation ----------------- */
export const bouncing_ball_ulife_example = () => ({
  metadata: {
    width: 1920,
    height: 1080,
    fps: 30,
    duration_in_frames: 150, // 5 seconds at 30fps
  },
  tsx: `import React from 'react';\nimport { AbsoluteFill, Easing, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';\n\nconst Ball: React.FC<{jumpStartFrame: number}> = ({jumpStartFrame}) => {\n  const frame = useCurrentFrame();\n  const {fps} = useVideoConfig();\n  const progress = spring({\n    fps,\n    frame: frame - jumpStartFrame,\n    config: {\n      damping: 26,\n      mass: 1,\n      stiffness: 170,\n    },\n  });\n\n  const translateY = interpolate(progress, [0, 1], [0, -300]);\n  const translateX = interpolate(progress, [0, 1], [0, 400]);\n\n  return (\n    <div\n      style={{\n        height: 50,\n        width: 50,\n        borderRadius: 25,\n        backgroundColor: '#FFD700',\n        boxShadow: '0 0 10px #FFD700',\n        position: 'absolute',\n        bottom: 50 + translateY,\n        left: 100 + translateX,\n        filter: 'blur(2px)',\n      }}\n    />\n  );\n};\n\nconst UlifeText: React.FC = () => {\n  const frame = useCurrentFrame();\n  const {fps} = useVideoConfig();\n  const letters = ['U', 'l', 'i', 'f', 'e'];\n  return (\n    <div style={{position: 'absolute', bottom: 200, left: '50%', transform: 'translateX(-50%)', fontSize: 100, fontWeight: 'bold', color: '#FFFFFF'}}>\n      {letters.map((letter, index) => {\n        const opacity = interpolate(frame, [30 + index * 5, 35 + index * 5], [0, 1], {\n          extrapolateLeft: 'clamp',\n          extrapolateRight: 'clamp',\n        });\n        return (\n          <span key={letter} style={{opacity}}>\n            {letter}\n          </span>\n        );\n      })}\n    </div>\n  );\n};\n\nexport const GeneratedComp: React.FC = () => {\n  const {width, height} = useVideoConfig();\n\n  return (\n    <AbsoluteFill style={{backgroundColor: '#282c34'}}>\n      <Sequence from={0} durationInFrames={Infinity}>\n        <UlifeText />\n      </Sequence>\n      <Sequence from={0} durationInFrames={45}>\n        <Ball jumpStartFrame={0} />\n      </Sequence>\n      <Sequence from={45} durationInFrames={45}>\n        <Ball jumpStartFrame={45} />\n      </Sequence>\n      <Sequence from={90} durationInFrames={60}>\n        <Ball jumpStartFrame={90} />\n      </Sequence>\n    </AbsoluteFill>\n  );\n};\n\nexport default GeneratedComp;`,
});

/* ----------------- Fireship Style Reel with rapid animations and modern UI ----------------- */
export const fireship_reel_example = () => ({
  metadata: {
    width: 1080,
    height: 1920,
    fps: 30,
    duration_in_frames: 450, // 15 seconds
  },
  tsx: `import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Sequence, Img, AbsoluteFill, Video } from 'remotion';

export const GeneratedComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background Sources (Images and Videos)
  const bgSources = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&h=1920&q=80' },
    { 
      type: 'video', 
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      fallback: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&h=1920&q=80'
    },
    { type: 'image', src: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&h=1920&q=80' },
    { 
      type: 'video', 
      src: 'https://sample-videos.com/zip/10/mp4/360/SampleVideo_360x240_1mb.mp4',
      fallback: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&h=1920&q=80'
    },
    { type: 'image', src: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&h=1920&q=80' },
    { 
      type: 'video', 
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      fallback: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&h=1920&q=80'
    },
    { type: 'image', src: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&h=1920&q=80' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&h=1920&q=80' },
  ];
  
  // Fast-paced text sequences like Fireship
  const textSequences = [
    { text: "JavaScript en 2024", subtitle: "C'est le chaos", start: 0, duration: 60, type: "title" },
    { text: "React", subtitle: "Le roi incontesté", start: 60, duration: 45, type: "tech" },
    { text: "Next.js", subtitle: "Framework meta", start: 105, duration: 45, type: "tech" },
    { text: "TypeScript", subtitle: "JavaScript mais en mieux", start: 150, duration: 45, type: "tech" },
    { text: "MAIS ATTENDEZ", subtitle: "Il y a plus...", start: 195, duration: 60, type: "transition" },
    { text: "Tailwind CSS", subtitle: "Utility-first magic", start: 255, duration: 45, type: "tech" },
    { text: "Vercel", subtitle: "Deploy en 1 clic", start: 300, duration: 45, type: "tech" },
    { text: "hello world", subtitle: "Le classique éternel", start: 345, duration: 105, type: "finale" },
  ];
  
  // Get current sequence
  const currentSequence = textSequences.find(seq => 
    frame >= seq.start && frame < seq.start + seq.duration
  );
  const currentSequenceIndex = textSequences.findIndex(seq => frame >= seq.start && frame < seq.start + seq.duration);
  
  const sequenceProgress = currentSequence ? 
    (frame - currentSequence.start) / currentSequence.duration : 0;

  const currentBgIndex = currentSequenceIndex >= 0 ? currentSequenceIndex % bgSources.length : 0;
  const currentBgSource = currentSequenceIndex >= 0 ? bgSources[currentBgIndex] : null;

  // Video error state - we'll treat videos with errors as images
  const [videoErrors, setVideoErrors] = React.useState<Set<string>>(new Set());
  
  // Determine if current source should be treated as image (either it's an image or video failed)
  const shouldUseImage = !currentBgSource || 
    currentBgSource.type === 'image' || 
    (currentBgSource.type === 'video' && videoErrors.has(currentBgSource.src));
  
  const effectiveImageSrc = shouldUseImage ? 
    (currentBgSource?.type === 'image' ? currentBgSource.src : currentBgSource?.fallback) : null;

  // Ken Burns effect for background image (only if current source is treated as an image)
  const bgImageScale = shouldUseImage && currentSequence ? interpolate(sequenceProgress, [0, 1], [1.1, 1.3]) : 1;
  const bgImageTranslateX = shouldUseImage && currentSequence ? interpolate(sequenceProgress, [0, 1], [0, -30 * (currentSequenceIndex % 2 === 0 ? 1 : -1) ]) : 0;
  const bgImageTranslateY = shouldUseImage && currentSequence ? interpolate(sequenceProgress, [0, 1], [0, 15 * (currentSequenceIndex % 2 === 0 ? 1 : -1) ]) : 0;
  
  // Text animations based on sequence type
  const getTextAnimation = (type: string, progress: number, seqDuration: number) => {
    const springConfigFast = { damping: 18, stiffness: 280, mass: 0.9 };
    const springConfigMedium = { damping: 15, stiffness: 200 };
    const springConfigSlow = { damping: 12, stiffness: 150 };

    switch(type) {
      case "title":
        return {
          scale: spring({ frame: frame - (currentSequence?.start || 0), fps, config: springConfigMedium }),
          y: interpolate(progress, [0, 0.2, 0.8, 1], [100, 0, 0, -70]),
          opacity: interpolate(progress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]),
          rotateZ: interpolate(progress, [0, 1], [-4, 4]),
        };
      case "tech":
        return {
          scale: interpolate(progress, [0, 0.1, 0.8, 1], [0.6, 1.15, 1.1, 0.7]),
          y: interpolate(progress, [0, 0.1, 0.85, 1], [50, 0, 0, -40]),
          opacity: interpolate(progress, [0, 0.05, 0.8, 1], [0, 1, 1, 0]),
          rotateZ: interpolate(progress, [0, 1], [2, -2]),
        };
      case "transition":
        return {
          scale: interpolate(progress, [0, 0.2, 0.8, 1], [0.4, 1.25, 1.15, 0.6]),
          y: 0,
          opacity: interpolate(progress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]),
          rotateZ: interpolate(progress, [0, 1], [-8, 8]),
        };
      case "finale":
        return {
          scale: spring({ frame: frame - (currentSequence?.start || 0), fps, config: springConfigSlow }),
          y: interpolate(progress, [0, 0.3, 0.7, 1], [120, 0, 0, -90]),
          opacity: interpolate(progress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]),
          rotateZ: 0,
        };
      default:
        return { scale: 1, y: 0, opacity: 1, rotateZ: 0 };
    }
  };
  
  const textAnim = currentSequence ? getTextAnimation(currentSequence.type, sequenceProgress, currentSequence.duration) : { scale: 1, y: 0, opacity: 0, rotateZ: 0 };
  
  // Floating tech icons animation
  const techIcons = ['⚛️', '🔥', '💎', '🚀', '⚡', '🎯', '🔧', '💻'];
  
  // Progress bar
  const progressWidth = (frame / 450) * 100;
  
  // Flash effect for transitions
  const flashOpacity = currentSequence?.type === 'transition' ? 
    interpolate(sequenceProgress, [0, 0.1, 0.2], [0, 0.4, 0]) : 0;

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: '#0F0F1A', // Darker, slightly blueish background
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background Image or Video with Ken Burns for images */}
      {currentSequence && currentBgSource && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}>
          {shouldUseImage ? (
            <Img
              src={effectiveImageSrc}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: \`scale(\${bgImageScale}) translateX(\${bgImageTranslateX}px) translateY(\${bgImageTranslateY}px)\`,
                filter: 'brightness(0.7) contrast(1.1) saturate(1.1)', // Slightly increased brightness for images
              }}
            />
          ) : ( // type === 'video' and no error
            <AbsoluteFill>
              <Video
                src={currentBgSource.src}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                loop
                muted
                playbackRate={1.2} // Fast-paced feel
                onError={(e) => {
                  console.error("Video Error: ", e);
                  setVideoErrors(prev => new Set([...prev, currentBgSource.src]));
                }}
                startFrom={0}
                endAt={999999}
              />
            </AbsoluteFill>
          )}
          {/* Adjusted Dark overlay for better text readability */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.6) 100%)', // Reduced darkness
          }}/>
        </div>
      )}
      
      {/* Floating tech icons */}
      {techIcons.map((icon, i) => {
        const iconFrame = frame + i * 20;
        const x = interpolate(iconFrame, [0, 450], [Math.random() * 100, Math.random() * 100], { extrapolateRight: 'wrap' });
        const y = interpolate(iconFrame, [0, 450], [Math.random() * 100, Math.random() * 100], { extrapolateRight: 'wrap' });
        const rotation = interpolate(iconFrame, [0, 450], [0, 360], { extrapolateRight: 'wrap' });
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: \`\${x}%\`,
              top: \`\${y}%\`,
              fontSize: 24,
              transform: \`rotate(\${rotation}deg)\`,
              opacity: 0.1,
              pointerEvents: 'none',
            }}
          >
            {icon}
          </div>
        );
      })}
      
      {/* Flash transition effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
        opacity: flashOpacity,
        pointerEvents: 'none',
      }} />
      
      {/* Main content container */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
        textAlign: 'center',
        zIndex: 10,
      }}>
        
        {currentSequence && (
          <>
            {/* Main text */}
            <div style={{
              transform: \`scale(\${textAnim.scale}) translateY(\${textAnim.y}px) rotateZ(\${textAnim.rotateZ}deg)\`,
              opacity: textAnim.opacity,
              marginBottom: 30,
            }}>
              <h1 style={{
                fontSize: currentSequence.type === 'finale' ? 72 : 
                         currentSequence.type === 'transition' ? 64 : 56,
                fontWeight: 900,
                color: currentSequence.type === 'finale' ? '#ffd700' :
                       currentSequence.type === 'transition' ? '#ff6b6b' :
                       currentSequence.type === 'title' ? '#4ecdc4' : '#ffffff',
                margin: 0,
                lineHeight: 1.1,
                textShadow: currentSequence.type === 'finale' ? 
                  '0 0 30px #ffd700, 0 4px 20px rgba(0,0,0,0.8)' :
                  '0 4px 20px rgba(0,0,0,0.8)',
                letterSpacing: currentSequence.type === 'transition' ? '3px' : '1px',
                textTransform: currentSequence.type === 'transition' ? 'uppercase' : 'none',
                background: currentSequence.type === 'finale' ? 
                  'linear-gradient(45deg, #ffd700, #ffed4e, #ffd700)' : 'none',
                backgroundClip: currentSequence.type === 'finale' ? 'text' : 'initial',
                WebkitBackgroundClip: currentSequence.type === 'finale' ? 'text' : 'initial',
                WebkitTextFillColor: currentSequence.type === 'finale' ? 'transparent' : 'inherit',
                animation: currentSequence.type === 'finale' ? 'none' : 'none',
              }}>
                {currentSequence.text}
              </h1>
            </div>
            
            {/* Subtitle */}
            <div style={{
              transform: \`translateY(\${textAnim.y * 0.4 + 15}px) scale(\${interpolate(sequenceProgress, [0.1, 0.3, 0.8, 1], [0.7, 1, 1, 0.6])})\`,
              opacity: interpolate(sequenceProgress, [0.15, 0.3, 0.8, 1], [0, 1, 1, 0]),
            }}>
              <p style={{
                fontSize: 28,
                fontWeight: 400,
                color: '#bdbdbd', // Slightly lighter for better contrast
                margin: 0,
                fontStyle: 'italic',
                textShadow: '0 2px 12px rgba(0,0,0,0.8)',
              }}>
                {currentSequence.subtitle}
              </p>
            </div>
          </>
        )}
        
        {/* Tech stack indicators for tech sequences */}
        {currentSequence?.type === 'tech' && (
          <div style={{
            position: 'absolute',
            bottom: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 20,
          }}>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: i === 2 ? '#4ecdc4' : 'rgba(255,255,255,0.3)',
                  transform: \`scale(\${i === 2 ? 1.5 : 1})\`,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: 100,
        right: 60,
        width: 4,
        height: 200,
        background: 'linear-gradient(180deg, #4ecdc4, transparent)',
        transform: \`scaleY(\${interpolate(sequenceProgress, [0, 0.5], [0, 1])})\`,
        transformOrigin: 'top',
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: 200,
        left: 60,
        width: 150,
        height: 4,
        background: 'linear-gradient(90deg, #ff6b6b, transparent)',
        transform: \`scaleX(\${interpolate(sequenceProgress, [0.2, 0.7], [0, 1])})\`,
        transformOrigin: 'left',
      }} />
      
      {/* Progress bar at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 6,
        background: 'rgba(255,255,255,0.1)',
      }}>
        <div style={{
          width: \`\${progressWidth}%\`,
          height: '100%',
          background: 'linear-gradient(90deg, #4ecdc4, #45b7d1, #ff6b6b)',
          transition: 'width 0.1s ease',
        }} />
      </div>
      
      {/* Corner accent */}
      <div style={{
        position: 'absolute',
        top: 40,
        left: 40,
        fontSize: 24,
        color: '#4ecdc4',
        fontWeight: 'bold',
      }}>
        {'</>'}
      </div>
      
      {/* Frame counter (Fireship style) */}
      <div style={{
        position: 'absolute',
        top: 40,
        right: 40,
        fontSize: 16,
        color: 'rgba(255,255,255,0.5)',
        fontFamily: 'monospace',
      }}>
        {String(frame).padStart(3, '0')}
      </div>
    </div>
  );
};

export default GeneratedComp;`,
});
