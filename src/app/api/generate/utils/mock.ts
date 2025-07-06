// fake output to for the expected output from supabase
export const mock: Omit<Video, "id"> = {
  created_at: new Date().toISOString(),
  name: "Hello World Particle",
  profile_id: "8ca7f1bc-35f7-4810-99de-58795c9697ff",
  width: 1920,
  height: 1080,
  fps: 30,
  duration_in_frames: 300,
  composition: {
    textStompLayer: {
      sections: [
        {
          words: [
            {
              text: "HELLO",
              inFrame: 0,
              outFrame: 60,
              fxs: [
                // each animation will split the total duration equally (outFrame - inFrame) / fxs.length
                // 1st part animation of the word
                {
                  scale: [0, 1],
                  rotation: [-20, 0],
                  opacity: [0, 1],
                  color: ["#ffffff", "#ffffff"],
                  bgColor: ["#000000", "#000000"],
                },
                //2nd part animation of the word
                {
                  scale: [1, 1],
                  rotation: [0, 0],
                  opacity: [1, 1],
                  color: ["#000000", "#000000"],
                  bgColor: ["#fcd34d", "#fcd34d"],
                },
                // and so on...
              ],
            },
            {
              text: "WORLD",
              inFrame: 30,
              outFrame: 60,
              fxs: [
                {
                  scale: [0, 1],
                  rotation: [20, 0],
                  opacity: [0, 1],
                  color: ["#ffffff", "#fcd34d"],
                  bgColor: ["#000000", "#000000"],
                },
                {
                  scale: [1, 1],
                  rotation: [0, 0],
                  opacity: [1, 1],
                  color: ["#000000", "#000000"],
                  bgColor: ["#fcd34d", "#fcd34d"],
                },
              ],
            },
            {
              text: "PEOPLE",
              inFrame: 60,
              outFrame: 90,
              fxs: [
                {
                  scale: [0.3, 1],
                  rotation: [0, 30],
                  opacity: [0, 1],
                  color: ["#ffffff", "#ffffff"],
                  bgColor: ["#000000", "#000000"],
                },
              ],
            },
            {
              text: "THAT'S",
              inFrame: 90,
              outFrame: 120,
              fxs: [
                {
                  opacity: [0, 1],
                  translateX: [-400, 0],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
                {
                  scale: [0.8, 1.1],
                  opacity: [0, 1],
                  rotation: [-10, 0],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
              ],
            },
            {
              text: "A BIG",
              inFrame: 120,
              outFrame: 150,
              fxs: [
                {
                  opacity: [0, 1],
                  translateX: [400, 0],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
                {
                  scale: [1.1, 1],
                  opacity: [0, 1],
                  rotation: [0, 10],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
              ],
            },
            {
              text: "REVOLUTION",
              inFrame: 150,
              outFrame: 180,
              fxs: [
                {
                  opacity: [0, 1],
                  translateY: [-300, 0],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
                {
                  scale: [0.5, 1.2],
                  opacity: [0, 1],
                  rotation: [0, -5],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
              ],
            },
          ],
          audioUrl:
            "https://legendary.b-cdn.net/audio/segment-1751076854257-0.mp3",
          start: 0,
          end: 150,
          duration: 150,
        },
        {
          words: [
            {
              text: "HELLO",
              inFrame: 150,
              outFrame: 170,
              fxs: [
                // each animation will split the total duration equally (outFrame - inFrame) / fxs.length
                // 1st part animation of the word
                {
                  scale: [0, 1],
                  rotation: [-20, 0],
                  opacity: [0, 1],
                  color: ["#ffffff", "#ffffff"],
                  bgColor: ["#000000", "#000000"],
                },
                //2nd part animation of the word
                {
                  scale: [1, 1],
                  rotation: [0, 0],
                  opacity: [1, 1],
                  color: ["#000000", "#000000"],
                  bgColor: ["#fcd34d", "#fcd34d"],
                },
                // and so on...
              ],
            },
            {
              text: "WORLD",
              inFrame: 170,
              outFrame: 190,
              fxs: [
                {
                  scale: [0, 1],
                  rotation: [20, 0],
                  opacity: [0, 1],
                  color: ["#ffffff", "#fcd34d"],
                  bgColor: ["#000000", "#000000"],
                },
                {
                  scale: [1, 1],
                  rotation: [0, 0],
                  opacity: [1, 1],
                  color: ["#000000", "#000000"],
                  bgColor: ["#fcd34d", "#fcd34d"],
                },
              ],
            },
            {
              text: "PEOPLE",
              inFrame: 190,
              outFrame: 200,
              fxs: [
                {
                  scale: [0.3, 1],
                  rotation: [0, 30],
                  opacity: [0, 1],
                  color: ["#ffffff", "#ffffff"],
                  bgColor: ["#000000", "#000000"],
                },
              ],
            },
            {
              text: "THAT'S",
              inFrame: 200,
              outFrame: 220,
              fxs: [
                {
                  opacity: [0, 1],
                  translateX: [-400, 0],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
                {
                  scale: [0.8, 1.1],
                  opacity: [0, 1],
                  rotation: [-10, 0],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
              ],
            },
            {
              text: "A BIG",
              inFrame: 220,
              outFrame: 240,
              fxs: [
                {
                  opacity: [0, 1],
                  translateX: [400, 0],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
                {
                  scale: [1.1, 1],
                  opacity: [0, 1],
                  rotation: [0, 10],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
              ],
            },
            {
              text: "REVOLUTION",
              inFrame: 240,
              outFrame: 260,
              fxs: [
                {
                  opacity: [0, 1],
                  translateY: [-300, 0],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
                {
                  scale: [0.5, 1.2],
                  opacity: [0, 1],
                  rotation: [0, -5],
                  bgColor: ["#2dd4bf", "#2dd4bf"],
                },
              ],
            },
          ],
          audioUrl:
            "https://legendary.b-cdn.net/audio/segment-1751076853900-1.mp3",
          start: 150,
          end: 300,
          duration: 150,
        },
      ],
    },
  },
};
