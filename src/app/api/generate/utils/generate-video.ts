import type { GomotionSpec } from "@/gomotion-compiler/spec";

type GenerateVideo = {
  prompt: string;
  voiceId: string;
  aspectRatio: string;
};

const DEFAULT_FPS = 30;

export async function generateVideo({
  prompt,
  voiceId,
  aspectRatio,
}: GenerateVideo): Promise<GomotionSpec> {
  const [width, height] = aspectRatio.split(":").map(Number);

  // const response = await fetch(
  //   `${process.env.MASTRA_URL}/api/workflows/remotionWorkflow/start-async`,
  //   {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       inputData: {
  //         userRequest: {
  //           prompt,
  //           meta: { voiceId, width, height, fps: DEFAULT_FPS },
  //         },
  //       },
  //       runtimeContext: {},
  //     }),
  //   },
  // );

  // const data = await response.json();

  const data = {
    "name": "Mastering Minimalism in 90 Seconds",
    "layers": [
      {
        "startMs": 0,
        "durationMs": 17159.99984741211,
        "id": "t0",
        "type": "audio",
        "payload": {
          "url": "https://legendary.b-cdn.net/audio/segment-1752109086504-0.mp3"
        }
      },
      {
        "id": "t0",
        "type": "text",
        "startMs": 0,
        "durationMs": 800,
        "payload": {
          "text": "WELCOME",
          "animations": [
            {
              "startMs": 0,
              "endMs": 400,
              "cssProperties": {
                "opacity": 0,
                "transform": "scale(2.8) translateY(80px) rotate(15deg)",
                "color": "#ffffff",
                "backgroundColor": "#000000",
                "fontFamily": "'Bebas Neue', Impact, sans-serif",
                "fontSize": "150px",
                "letterSpacing": "-2px"
              }
            },
            {
              "startMs": 400,
              "endMs": 800,
              "cssProperties": {
                "opacity": 1,
                "transform": "scale(1) translateY(0px) rotate(0deg)",
                "color": "#ffe066",
                "backgroundColor": "#000000",
                "fontFamily": "'Bebas Neue', Impact, sans-serif",
                "fontSize": "150px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t1",
        "type": "text",
        "startMs": 800,
        "durationMs": 700,
        "payload": {
          "text": "to the minimalist",
          "animations": [
            {
              "startMs": 0,
              "endMs": 350,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateX(-120px) skewX(-10deg) scale(0.8)",
                "color": "#ffffff",
                "backgroundColor": "#1d3557",
                "fontFamily": "'Montserrat', sans-serif",
                "fontSize": "90px",
                "letterSpacing": "1px"
              }
            },
            {
              "startMs": 350,
              "endMs": 700,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateX(0px) skewX(0deg) scale(1)",
                "color": "#f1faee",
                "backgroundColor": "#1d3557",
                "fontFamily": "'Montserrat', sans-serif",
                "fontSize": "90px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t2",
        "type": "text",
        "startMs": 1500,
        "durationMs": 1800,
        "payload": {
          "text": "REVOLUTION.",
          "animations": [
            {
              "startMs": 0,
              "endMs": 600,
              "cssProperties": {
                "opacity": 0,
                "transform": "scale(0.5) rotate(-45deg) translateY(-120px)",
                "color": "#ffffff",
                "backgroundColor": "#000000",
                "fontFamily": "'Montserrat Black', Impact, sans-serif",
                "fontSize": "140px",
                "letterSpacing": "4px"
              }
            },
            {
              "startMs": 600,
              "endMs": 1000,
              "cssProperties": {
                "opacity": 1,
                "transform": "scale(1.3) rotate(5deg) translateY(0px)",
                "color": "#e63946",
                "backgroundColor": "#000000",
                "fontFamily": "'Montserrat Black', Impact, sans-serif",
                "fontSize": "140px",
                "letterSpacing": "2px"
              }
            },
            {
              "startMs": 1000,
              "endMs": 1800,
              "cssProperties": {
                "opacity": 1,
                "transform": "scale(1) rotate(0deg) translateY(0px)",
                "color": "#ffffff",
                "backgroundColor": "#000000",
                "fontFamily": "'Montserrat Black', Impact, sans-serif",
                "fontSize": "140px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t3",
        "type": "text",
        "startMs": 4100,
        "durationMs": 700,
        "payload": {
          "text": "IN THE NEXT",
          "animations": [
            {
              "startMs": 0,
              "endMs": 350,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateY(100px) scale(0.9) rotate(0deg)",
                "color": "#ffffff",
                "backgroundColor": "#264653",
                "fontFamily": "'Roboto Condensed', sans-serif",
                "fontSize": "90px",
                "letterSpacing": "2px"
              }
            },
            {
              "startMs": 350,
              "endMs": 700,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateY(0px) scale(1) rotate(0deg)",
                "color": "#a8dadc",
                "backgroundColor": "#264653",
                "fontFamily": "'Roboto Condensed', sans-serif",
                "fontSize": "90px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t4",
        "type": "text",
        "startMs": 4800,
        "durationMs": 1000,
        "payload": {
          "text": "90 SECONDS",
          "animations": [
            {
              "startMs": 0,
              "endMs": 400,
              "cssProperties": {
                "opacity": 0,
                "transform": "scale(4) rotate(-10deg) translateY(-60px)",
                "color": "#ffffff",
                "backgroundColor": "#000000",
                "fontFamily": "'Bungee', cursive",
                "fontSize": "160px",
                "letterSpacing": "8px"
              }
            },
            {
              "startMs": 400,
              "endMs": 700,
              "cssProperties": {
                "opacity": 1,
                "transform": "scale(1) rotate(0deg) translateY(0px)",
                "color": "#f72585",
                "backgroundColor": "#000000",
                "fontFamily": "'Bungee', cursive",
                "fontSize": "160px",
                "letterSpacing": "2px"
              }
            },
            {
              "startMs": 700,
              "endMs": 1000,
              "cssProperties": {
                "opacity": 1,
                "transform": "scale(1) rotate(0deg) translateY(0px)",
                "color": "#ffffff",
                "backgroundColor": "#000000",
                "fontFamily": "'Bungee', cursive",
                "fontSize": "160px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t5",
        "type": "text",
        "startMs": 5800,
        "durationMs": 800,
        "payload": {
          "text": "we're going to",
          "animations": [
            {
              "startMs": 0,
              "endMs": 400,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateX(150px) scale(0.9) rotate(0deg)",
                "color": "#ffffff",
                "backgroundColor": "#2a9d8f",
                "fontFamily": "'Roboto Slab', serif",
                "fontSize": "80px",
                "letterSpacing": "1px"
              }
            },
            {
              "startMs": 400,
              "endMs": 800,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateX(0px) scale(1) rotate(0deg)",
                "color": "#e9c46a",
                "backgroundColor": "#2a9d8f",
                "fontFamily": "'Roboto Slab', serif",
                "fontSize": "80px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t6",
        "type": "text",
        "startMs": 6600,
        "durationMs": 800,
        "payload": {
          "text": "STRIP DOWN",
          "animations": [
            {
              "startMs": 0,
              "endMs": 400,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateX(-100%) scale(1) rotate(0deg)",
                "color": "#ffffff",
                "backgroundColor": "#000000",
                "fontFamily": "'Oswald', sans-serif",
                "fontSize": "120px",
                "letterSpacing": "2px"
              }
            },
            {
              "startMs": 400,
              "endMs": 800,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateX(0%) scale(1) rotate(0deg)",
                "color": "#f94144",
                "backgroundColor": "#000000",
                "fontFamily": "'Oswald', sans-serif",
                "fontSize": "120px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t7",
        "type": "text",
        "startMs": 7400,
        "durationMs": 900,
        "payload": {
          "text": "the CHAOS",
          "animations": [
            {
              "startMs": 0,
              "endMs": 450,
              "cssProperties": {
                "opacity": 0,
                "transform": "rotate(20deg) scale(0.7) translateY(0px)",
                "color": "#ffffff",
                "backgroundColor": "#000000",
                "fontFamily": "'Anton', sans-serif",
                "fontSize": "110px",
                "letterSpacing": "3px"
              }
            },
            {
              "startMs": 450,
              "endMs": 900,
              "cssProperties": {
                "opacity": 1,
                "transform": "rotate(0deg) scale(1) translateY(0px)",
                "color": "#e63946",
                "backgroundColor": "#000000",
                "fontFamily": "'Anton', sans-serif",
                "fontSize": "110px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t8",
        "type": "text",
        "startMs": 8300,
        "durationMs": 800,
        "payload": {
          "text": "and embrace",
          "animations": [
            {
              "startMs": 0,
              "endMs": 400,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateY(120px) scale(0.9) rotate(0deg)",
                "color": "#ffffff",
                "backgroundColor": "#1d3557",
                "fontFamily": "'Poppins', sans-serif",
                "fontSize": "80px",
                "letterSpacing": "2px"
              }
            },
            {
              "startMs": 400,
              "endMs": 800,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateY(0px) scale(1) rotate(0deg)",
                "color": "#f1faee",
                "backgroundColor": "#1d3557",
                "fontFamily": "'Poppins', sans-serif",
                "fontSize": "80px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t9",
        "type": "text",
        "startMs": 9100,
        "durationMs": 900,
        "payload": {
          "text": "the BEAUTY",
          "animations": [
            {
              "startMs": 0,
              "endMs": 450,
              "cssProperties": {
                "opacity": 0,
                "transform": "scale(0.5) rotate(-10deg) translateX(0px)",
                "color": "#ffffff",
                "backgroundColor": "#14213d",
                "fontFamily": "'Playfair Display', serif",
                "fontSize": "100px",
                "letterSpacing": "3px"
              }
            },
            {
              "startMs": 450,
              "endMs": 900,
              "cssProperties": {
                "opacity": 1,
                "transform": "scale(1) rotate(0deg) translateX(0px)",
                "color": "#fca311",
                "backgroundColor": "#14213d",
                "fontFamily": "'Playfair Display', serif",
                "fontSize": "100px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t10",
        "type": "text",
        "startMs": 10000,
        "durationMs": 1100,
        "payload": {
          "text": "of SIMPLICITY",
          "animations": [
            {
              "startMs": 0,
              "endMs": 550,
              "cssProperties": {
                "opacity": 0,
                "transform": "scale(0.5) rotate(0deg) translateZ(0)",
                "color": "#ffffff",
                "backgroundColor": "#000000",
                "fontFamily": "'Josefin Sans', sans-serif",
                "fontSize": "120px",
                "letterSpacing": "4px"
              }
            },
            {
              "startMs": 550,
              "endMs": 1100,
              "cssProperties": {
                "opacity": 1,
                "transform": "scale(1) rotate(0deg) translateZ(0)",
                "color": "#06d6a0",
                "backgroundColor": "#000000",
                "fontFamily": "'Josefin Sans', sans-serif",
                "fontSize": "120px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t11",
        "type": "text",
        "startMs": 12600,
        "durationMs": 700,
        "payload": {
          "text": "BUCKLE UP,",
          "animations": [
            {
              "startMs": 0,
              "endMs": 350,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateX(150px) rotate(10deg) scale(0.8)",
                "color": "#ffffff",
                "backgroundColor": "#e76f51",
                "fontFamily": "'Bebas Neue', sans-serif",
                "fontSize": "130px",
                "letterSpacing": "2px"
              }
            },
            {
              "startMs": 350,
              "endMs": 700,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateX(0px) rotate(0deg) scale(1)",
                "color": "#ffffff",
                "backgroundColor": "#e76f51",
                "fontFamily": "'Bebas Neue', sans-serif",
                "fontSize": "130px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t12",
        "type": "text",
        "startMs": 13300,
        "durationMs": 800,
        "payload": {
          "text": "because this is",
          "animations": [
            {
              "startMs": 0,
              "endMs": 400,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateY(-80px) scale(0.9) rotate(0deg)",
                "color": "#ffffff",
                "backgroundColor": "#264653",
                "fontFamily": "'Lato', sans-serif",
                "fontSize": "80px",
                "letterSpacing": "1px"
              }
            },
            {
              "startMs": 400,
              "endMs": 800,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateY(0px) scale(1) rotate(0deg)",
                "color": "#e9c46a",
                "backgroundColor": "#264653",
                "fontFamily": "'Lato', sans-serif",
                "fontSize": "80px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t13",
        "type": "text",
        "startMs": 14100,
        "durationMs": 800,
        "payload": {
          "text": "going to be",
          "animations": [
            {
              "startMs": 0,
              "endMs": 400,
              "cssProperties": {
                "opacity": 0,
                "transform": "skewX(15deg) scale(0.8) translateX(0px)",
                "color": "#ffffff",
                "backgroundColor": "#457b9d",
                "fontFamily": "'Montserrat', sans-serif",
                "fontSize": "80px",
                "letterSpacing": "1px"
              }
            },
            {
              "startMs": 400,
              "endMs": 800,
              "cssProperties": {
                "opacity": 1,
                "transform": "skewX(0deg) scale(1) translateX(0px)",
                "color": "#a8dadc",
                "backgroundColor": "#457b9d",
                "fontFamily": "'Montserrat', sans-serif",
                "fontSize": "80px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t14",
        "type": "text",
        "startMs": 14900,
        "durationMs": 900,
        "payload": {
          "text": "a SMOOTH",
          "animations": [
            {
              "startMs": 0,
              "endMs": 450,
              "cssProperties": {
                "opacity": 0,
                "transform": "scale(0.5) rotate(0deg) translateY(0px)",
                "color": "#ffffff",
                "backgroundColor": "#2a9d8f",
                "fontFamily": "'Bungee', sans-serif",
                "fontSize": "120px",
                "letterSpacing": "4px"
              }
            },
            {
              "startMs": 450,
              "endMs": 900,
              "cssProperties": {
                "opacity": 1,
                "transform": "scale(1) rotate(0deg) translateY(0px)",
                "color": "#2a9d8f",
                "backgroundColor": "#ffffff",
                "fontFamily": "'Bungee', sans-serif",
                "fontSize": "120px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t15",
        "type": "text",
        "startMs": 15800,
        "durationMs": 1360,
        "payload": {
          "text": "RIDE.",
          "animations": [
            {
              "startMs": 0,
              "endMs": 500,
              "cssProperties": {
                "opacity": 0,
                "transform": "scale(0.8) rotate(-10deg) translateX(-40px)",
                "color": "#ffffff",
                "backgroundColor": "#000000",
                "fontFamily": "'Anton', sans-serif",
                "fontSize": "150px",
                "letterSpacing": "6px"
              }
            },
            {
              "startMs": 500,
              "endMs": 900,
              "cssProperties": {
                "opacity": 1,
                "transform": "scale(1.2) rotate(5deg) translateX(0px)",
                "color": "#ffafcc",
                "backgroundColor": "#000000",
                "fontFamily": "'Anton', sans-serif",
                "fontSize": "150px",
                "letterSpacing": "4px"
              }
            },
            {
              "startMs": 900,
              "endMs": 1360,
              "cssProperties": {
                "opacity": 1,
                "transform": "scale(1) rotate(0deg) translateX(0px)",
                "color": "#ffffff",
                "backgroundColor": "#000000",
                "fontFamily": "'Anton', sans-serif",
                "fontSize": "150px",
                "letterSpacing": "0px"
              }
            }
          ]
        }
      },
      {
        "id": "t0",
        "type": "text",
        "startMs": 17210,
        "durationMs": 1500,
        "payload": {
          "text": "Ever heard the phrase",
          "animations": [
            {
              "startMs": 0,
              "endMs": 500,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateY(-60px) scale(0.8) rotate(0deg)",
                "color": "#ffffff",
                "backgroundColor": "transparent",
                "fontFamily": "Poppins, sans-serif",
                "fontSize": 64
              }
            },
            {
              "startMs": 500,
              "endMs": 1500,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateY(0px) scale(1) rotate(0deg)",
                "color": "#ffffff",
                "backgroundColor": "transparent",
                "fontFamily": "Poppins, sans-serif",
                "fontSize": 64
              }
            }
          ]
        }
      },
      {
        "id": "t1",
        "type": "text",
        "startMs": 18920,
        "durationMs": 1200,
        "payload": {
          "text": "LESS IS MORE?",
          "animations": [
            {
              "startMs": 0,
              "endMs": 600,
              "cssProperties": {
                "opacity": 0,
                "transform": "scale(2) translateY(0px) rotate(0deg)",
                "color": "#e63946",
                "backgroundColor": "transparent",
                "fontFamily": "Bebas Neue, Impact, sans-serif",
                "fontSize": 96
              }
            },
            {
              "startMs": 600,
              "endMs": 1200,
              "cssProperties": {
                "opacity": 1,
                "transform": "scale(1) translateY(0px) rotate(0deg)",
                "color": "#e63946",
                "backgroundColor": "transparent",
                "fontFamily": "Bebas Neue, Impact, sans-serif",
                "fontSize": 96
              }
            }
          ]
        }
      },
      {
        "id": "t2",
        "type": "text",
        "startMs": 21140,
        "durationMs": 700,
        "payload": {
          "text": "Well, in design",
          "animations": [
            {
              "startMs": 0,
              "endMs": 350,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateX(-100px) scale(0.9) rotate(-20deg)",
                "color": "#f1faee",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 58
              }
            },
            {
              "startMs": 350,
              "endMs": 700,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateX(0px) scale(1) rotate(0deg)",
                "color": "#f1faee",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 58
              }
            }
          ]
        }
      },
      {
        "id": "t3",
        "type": "text",
        "startMs": 22139,
        "durationMs": 1600,
        "payload": {
          "text": "it's not just a saying",
          "animations": [
            {
              "startMs": 0,
              "endMs": 800,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateX(-120px) skewX(-10deg) scale(0.8) rotate(0deg)",
                "color": "#457b9d",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 56
              }
            },
            {
              "startMs": 800,
              "endMs": 1600,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateX(0px) skewX(0deg) scale(1) rotate(0deg)",
                "color": "#457b9d",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 56
              }
            }
          ]
        }
      },
      {
        "id": "t4",
        "type": "text",
        "startMs": 23930,
        "durationMs": 1200,
        "payload": {
          "text": "it's a LIFESTYLE",
          "animations": [
            {
              "startMs": 0,
              "endMs": 600,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateY(80px) scale(0.6) rotate(0deg)",
                "color": "#e9c46a",
                "backgroundColor": "transparent",
                "fontFamily": "Bebas Neue, Impact, sans-serif",
                "fontSize": 80
              }
            },
            {
              "startMs": 600,
              "endMs": 1200,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateY(0px) scale(1.2) rotate(0deg)",
                "color": "#e9c46a",
                "backgroundColor": "transparent",
                "fontFamily": "Bebas Neue, Impact, sans-serif",
                "fontSize": 80
              }
            }
          ]
        }
      },
      {
        "id": "t5",
        "type": "text",
        "startMs": 26389,
        "durationMs": 600,
        "payload": {
          "text": "Minimalism",
          "animations": [
            {
              "startMs": 0,
              "endMs": 300,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateY(0px) scaleX(0) rotate(0deg)",
                "color": "#000000",
                "backgroundColor": "transparent",
                "fontFamily": "Poppins, sans-serif",
                "fontSize": 90
              }
            },
            {
              "startMs": 300,
              "endMs": 600,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateY(0px) scaleX(1) rotate(0deg)",
                "color": "#000000",
                "backgroundColor": "transparent",
                "fontFamily": "Poppins, sans-serif",
                "fontSize": 90
              }
            }
          ]
        }
      },
      {
        "id": "t6",
        "type": "text",
        "startMs": 26969,
        "durationMs": 700,
        "payload": {
          "text": "is like",
          "animations": [
            {
              "startMs": 0,
              "endMs": 350,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateX(80px) scale(0.8) rotate(0deg)",
                "color": "#1d3557",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 54
              }
            },
            {
              "startMs": 350,
              "endMs": 700,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateX(0px) scale(1) rotate(0deg)",
                "color": "#1d3557",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 54
              }
            }
          ]
        }
      },
      {
        "id": "t7",
        "type": "text",
        "startMs": 27690,
        "durationMs": 1200,
        "payload": {
          "text": "the MARIE KONDO",
          "animations": [
            {
              "startMs": 0,
              "endMs": 600,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateX(100px) scale(0.5) rotate(0deg)",
                "color": "#ffbe0b",
                "backgroundColor": "transparent",
                "fontFamily": "Bebas Neue, Impact, sans-serif",
                "fontSize": 76
              }
            },
            {
              "startMs": 600,
              "endMs": 1200,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateX(0px) scale(1) rotate(0deg)",
                "color": "#ffbe0b",
                "backgroundColor": "transparent",
                "fontFamily": "Bebas Neue, Impact, sans-serif",
                "fontSize": 76
              }
            }
          ]
        }
      },
      {
        "id": "t8",
        "type": "text",
        "startMs": 28949,
        "durationMs": 800,
        "payload": {
          "text": "of aesthetics",
          "animations": [
            {
              "startMs": 0,
              "endMs": 400,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateY(40px) scale(0.9) rotate(0deg)",
                "color": "#1d3557",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 60
              }
            },
            {
              "startMs": 400,
              "endMs": 800,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateY(0px) scale(1) rotate(0deg)",
                "color": "#1d3557",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 60
              }
            }
          ]
        }
      },
      {
        "id": "t9",
        "type": "text",
        "startMs": 30559,
        "durationMs": 1000,
        "payload": {
          "text": "sparking JOY",
          "animations": [
            {
              "startMs": 0,
              "endMs": 500,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateY(-60px) scale(0.8) rotate(-3deg)",
                "color": "#ff006e",
                "backgroundColor": "transparent",
                "fontFamily": "Bebas Neue, Impact, sans-serif",
                "fontSize": 88
              }
            },
            {
              "startMs": 500,
              "endMs": 1000,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateY(0px) scale(1.3) rotate(0deg)",
                "color": "#ff006e",
                "backgroundColor": "transparent",
                "fontFamily": "Bebas Neue, Impact, sans-serif",
                "fontSize": 88
              }
            }
          ]
        }
      },
      {
        "id": "t10",
        "type": "text",
        "startMs": 31719,
        "durationMs": 1400,
        "payload": {
          "text": "with every clean line",
          "animations": [
            {
              "startMs": 0,
              "endMs": 700,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateX(-140px) scale(0.8) rotate(0deg)",
                "color": "#457b9d",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 54
              }
            },
            {
              "startMs": 700,
              "endMs": 1400,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateX(0px) scale(1) rotate(0deg)",
                "color": "#457b9d",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 54
              }
            }
          ]
        }
      },
      {
        "id": "t11",
        "type": "text",
        "startMs": 33420,
        "durationMs": 800,
        "payload": {
          "text": "and empty space",
          "animations": [
            {
              "startMs": 0,
              "endMs": 300,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateY(40px) scale(0.9) rotate(0deg)",
                "color": "#a8dadc",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 60
              }
            },
            {
              "startMs": 300,
              "endMs": 600,
              "cssProperties": {
                "opacity": 1,
                "transform": "translateY(0px) scale(1) rotate(0deg)",
                "color": "#a8dadc",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 60
              }
            },
            {
              "startMs": 600,
              "endMs": 800,
              "cssProperties": {
                "opacity": 0,
                "transform": "translateY(-20px) scale(1) rotate(0deg)",
                "color": "#a8dadc",
                "backgroundColor": "transparent",
                "fontFamily": "Montserrat, sans-serif",
                "fontSize": 60
              }
            }
          ]
        }
      }
    ]
  }
  // if (data.status !== "success") {
  //   console.log("API Error:", data);
  //   throw new Error(`Video generation failed with status: ${response.status}`);
  // }

  return {
    meta: {
      name: data.name as string,
      width,
      height,
      fps: DEFAULT_FPS,
    },
    layers: data.layers ?? [],
  };
}
