import React, { ReactNode } from "react";

const phrases = [
  "We are young",
  "We are passionates",
  "We are storytellers",
  "We are innovators turning big ideas into motion",
  "This is our team..",
];

export default function Description() {
  return (
    <div className="relative text-white uppercase text-[8vw] sm:text-[3vw] mt-[15vw] ml-[5vw] sm:ml-[10vw]">
      {phrases.map((phrase, index) => {
        return <AnimatedText key={index}>{phrase}</AnimatedText>;
      })}
    </div>
  );
}

function AnimatedText({ children }: { children: ReactNode }) {
  return <p className="footer-description relative m-0">{children}</p>;
}
