import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CustomPlayer } from "@/components/custom-player";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const Intro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const geoBgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const yMove = -750 * progress;
          const rotation = 360 * progress;

          gsap.to(geoBgRef.current, {
            y: yMove,
            rotation: rotation,
            duration: 0.1,
            ease: "none",
            overwrite: true,
          });
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pb-10 sm:pb-32 block-layout relative overflow-hidden"
    >
      <div className="h-[10rem]" />



      <div className="w-full justify-start flex container mx-auto">
        <div
          ref={geoBgRef}
          className="absolute opacity-25"
          style={{
            top: "100%",
            left: "20%",
            transform: "translate(-50%, -50%) scale(2.5)",
            transformOrigin: "center center",
            zIndex: -1,
          }}
        >
          <GeometricBackground />
        </div>
        <div className="mx-auto flex flex-col w-[70%] mx-auto ml-[25%] gap-8 md:flex-col items-center">
          <div className="flex-1">
            <h3 className="uppercase text-xl tracking-wide mb-2">
              [ Manifesto ]
            </h3>
          </div>

          <div className="flex-1  items-center space-y-6">
            <div className="w-full sm:w-[70%] mx-auto space-y-8">  
              
              <div className=" mx-auto px-6 py-12 leading-relaxed">
                <section>
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-8">
                    We're Building <span className="text-indigo-600">Gomotion</span><br/>
                    <span className="text-2xl sm:text-3xl font-medium text-gray-600">Because We're Tired of Great Ideas Dying in After Effects</span>
                  </h1>

                  <div className="bg-white p-8 rounded-lg shadow-sm  text-background border-l-4 border-indigo-600 mb-8">
                    <p className="text-lg mb-4">
                      I'm sitting here at 2 AM, staring at a timeline that should have taken 20 minutes but has eaten my entire weekend.
                    </p>
                    <p className="text-lg">
                      My co-founder just messaged me: <em>"Started another After Effects project. Send help."</em>
                    </p>
                  </div>

                  <p className="text-lg mb-6">
                    Here's the thing: <strong>I have a Master's in Data Science and 1,380 YouTube subscribers who trust me to explain complex AI concepts</strong>. My co-founder is a <strong>senior frontend engineer who's shipped amazing products for more companies than we can count</strong>. We're not dumb.
                  </p>

                  <p className="text-lg mb-6">
                    But when it comes to turning our ideas into motion? We're hostages.
                  </p>

                  <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">The Breaking Point</h2>
                  
                  <p className="text-lg mb-4">
                    <strong>Me:</strong> I've got this brilliant way to visualize how neural networks learn. It's crystal clear in my head. Should take 5 seconds of animation.
                  </p>
                  
                  <p className="text-lg mb-4">
                    <strong>Reality:</strong> 47 hours later, I'm googling "how to make text follow bezier curve" for the thousandth time, my idea is half-dead, and I'm questioning my life choices. The timeline? Never finished.
                  </p>

                  <p className="text-lg mb-4">
                    <strong>My co-founder:</strong> I need a simple product demo. Clean, professional, 30 seconds max.
                  </p>

                  <p className="text-lg mb-8">
                    <strong>Reality:</strong> Three abandoned After Effects projects later, we're still explaining our product with static screenshots and hand gestures.
                  </p>

                  <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
                    <p className="text-lg font-semibold text-red-800 mb-2">The moment we snapped:</p>
                    <p className="text-lg italic text-red-700">
                      "Why is explaining an idea pure joy, but showing the idea pure torture?"
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">What We're Actually Building</h2>
                  
                  <p className="text-lg mb-6">
                    Forget everything you know about motion graphics. We're not building another After Effects. We're not adding more buttons to Figma.
                  </p>

                  <p className="text-xl mb-6 font-semibold text-indigo-600">
                    We're replacing the entire timeline with a single prompt.
                  </p>

                  <div className="bg-gray-100  text-background p-6 rounded-lg mb-8">
                    <p className="text-lg mb-4">
                      <strong>You:</strong> "Make my logo bounce in like it's excited to be here"
                    </p>
                    <p className="text-lg mb-4">
                      <strong>Gomotion:</strong> *Handles the keyframes, easing curves, and color theory*
                    </p>
                    <p className="text-lg">
                      <strong>You:</strong> *Gets a shareable video in 45 seconds*
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">This Is Personal</h2>
                  
                  <p className="text-lg mb-4">
                    Every creator has that folder. You know the one. "Video Ideas" with 47 half-finished concepts that died because animation was too hard.
                  </p>

                  <p className="text-lg mb-4">
                    Every entrepreneur has that moment. When you realize a simple demo video would explain everything, but the learning curve feels steeper than your startup journey.
                  </p>

                  <p className="text-lg mb-8">
                    Every educator has that frustration. When you realize the perfect explanation is right there in your head, but getting it out requires learning software that feels like rocket science.
                  </p>

                  <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-8">
                    <p className="text-xl font-bold text-indigo-800 mb-2">We believe:</p>
                    <ul className="space-y-2 text-lg text-indigo-700">
                      <li>• Your creativity shouldn't be held hostage by software complexity</li>
                      <li>• Ideas have expiration dates – the tools shouldn't be slower than inspiration</li>
                      <li>• The best motion graphics tool is the one that disappears while you create</li>
                    </ul>
                  </div>

                  <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Where We're Going</h2>
                  
                  <p className="text-lg mb-4">
                    We're few months deep, shipping every Friday night with pizza boxes and energy drinks scattered across our desks. Our north star is simple:
                  </p>

                  <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-lg mb-8">
                    <p className="text-2xl font-bold mb-2">
                      Let anyone on Earth turn words into moving pictures
                    </p>
                    <p className="text-xl">
                      before their coffee gets cold.
                    </p>
                  </div>

                  <p className="text-lg mb-6">
                    If you've ever had a brilliant idea die in a timeline... If you've ever started an After Effects project and never finished it... If you've ever chosen NOT to share something because making it move felt impossible...
                  </p>

                  <p className="text-xl mb-8 font-semibold">
                    This is for you. This is for us. This is for everyone who's tired of great ideas staying stuck in their heads.
                  </p>

                  <div className="bg-white  text-background p-8 rounded-lg shadow-sm mb-8">
                    <p className="text-lg mb-4">
                      We read every email, every DM, every feedback note. Seriously.
                    </p>
                    <p className="text-lg mb-4">
                      <strong>Email us:</strong> <a href="mailto:hi@gomotion.ai" className="text-indigo-600 underline hover:text-indigo-500">hi@gomotion.ai</a>
                    </p>
                    <p className="text-lg mb-4">
                      <strong>Twitter:</strong> DMs are open.
                    </p>
                    <p className="text-lg">
                      <strong>Build with us:</strong> We're looking for early users who aren't afraid to break things and tell us about it.
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-medium mb-2">
                      — <strong>Lionel & Philippe</strong>
                    </p>
                    <p className="text-gray-600">
                      Co-founders, former timeline hostages, still pressing "publish"
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      P.S. Yes, we're still learning After Effects. No, we're not getting better at it.
                    </p>
                  </div>
                </section>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

const GeometricBackground = () => {
  return (
    <svg
      width="201"
      height="200"
      viewBox="0 0 201 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_1034)">
        <mask
          id="mask0_1_1034"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="201"
          height="200"
        >
          <path d="M200.5 0H0.5V200H200.5V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_1_1034)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M189.441 100C193.269 100 196.977 99.4861 200.5 98.5234C197.699 97.9327 194.795 97.622 191.819 97.622H142.355C134.185 97.622 126.561 95.2811 120.119 91.2334C121.527 82.9896 125.413 75.0866 131.777 68.7229L163.391 37.1094C166.098 34.4024 168.356 31.4169 170.167 28.2452C167.768 29.8079 165.495 31.6416 163.391 33.7463L128.414 68.7229C122.637 74.4999 115.591 78.2351 108.174 79.9285C103.34 73.1033 100.5 64.7671 100.5 55.7675V11.0593C100.5 7.23107 99.9861 3.5229 99.0234 0C98.4327 2.80071 98.122 5.70466 98.122 8.68118V58.1456C98.122 66.3155 95.7811 73.9388 91.7335 80.3812C83.4897 78.9727 75.5866 75.0865 69.2229 68.7228L37.6094 37.1094C34.9024 34.4024 31.9169 32.1437 28.7452 30.3334C30.3079 32.7315 32.1416 35.0047 34.2463 37.1094L69.2229 72.086C74.9999 77.8631 78.7352 84.9088 80.4285 92.3263C73.6033 97.1596 65.2671 100 56.2675 100H11.5593C7.73105 100 4.02289 100.514 0.5 101.477C3.30073 102.067 6.20469 102.378 9.18122 102.378H58.6456C66.8156 102.378 74.4388 104.719 80.8812 108.767C79.4727 117.01 75.5866 124.913 69.2229 131.277L37.6094 162.891C34.9025 165.598 32.6438 168.583 30.8335 171.755C33.2316 170.192 35.5047 168.358 37.6094 166.254L72.586 131.277C78.363 125.5 85.4088 121.765 92.8263 120.071C97.6596 126.897 100.5 135.233 100.5 144.233V188.941C100.5 192.769 101.014 196.477 101.977 200C102.567 197.199 102.878 194.295 102.878 191.319V141.854C102.878 133.684 105.219 126.061 109.267 119.619C117.51 121.027 125.413 124.913 131.777 131.277L163.391 162.891C166.098 165.598 169.083 167.856 172.255 169.667C170.692 167.268 168.858 164.995 166.754 162.891L131.777 127.914C126 122.137 122.265 115.091 120.572 107.674C127.397 102.84 135.733 100 144.733 100H189.441Z"
            fill="#a8a29e"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_1034">
          <rect
            width="200"
            height="200"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
