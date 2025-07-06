// fake output to for the expected output from supabase
import { TextStompProps } from "@/gomotion-compiler/text-stomp";

type Mock = {
  created_at: Video["created_at"];
  name: string;
  profile_id: string;
  width: number;
  height: number;
  fps: number;
  duration_in_frames: number;
  composition: {
    textStompLayer: {
      sections: TextStompProps[];
    };
  };
};

export const mock: Mock = {
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
          fps: 30,
          words: [
            {
              text: "HELLO",
              inFrame: 0,
              outFrame: 60,
              top: 0,
              left: 0,
              fxs: [
                // each animation will split the total duration equally (outFrame - inFrame) / fxs.length
                // 1st part animation of the word
                {
                  scale: [0, 1],
                  rotation: [-20, 0],
                  opacity: [0, 1],
                  color: ["#ffffff", "#ffffff"],
                },
                //2nd part animation of the word
                {
                  scale: [1, 1],
                  rotation: [0, 0],
                  opacity: [1, 1],
                  color: ["#ffffff", "#ffffff"],
                },
                // and so on...
              ],
            },
            {
              text: "WORLD",
              top: 0,
              left: 1050,
              inFrame: 30,
              outFrame: 60,
              fxs: [
                {
                  scale: [0, 1],
                  rotation: [20, 0],
                  opacity: [0, 1],
                  color: ["#ffffff", "#fcd34d"],
                },
                {
                  scale: [1, 1],
                  rotation: [0, 0],
                  opacity: [1, 1],
                  color: ["#ffffff", "#ffffff"],
                },
              ],
            },
          ],
          audio: {
            url: "https://legendary.b-cdn.net/audio/segment-1751076854257-0.mp3",
            start: 0,
            end: 150,
          },
        },
      ],
    },
  },
};
