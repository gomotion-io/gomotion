"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ElementType,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import SplitType from "split-type";

interface ShuffleTextProps extends HTMLAttributes<HTMLElement> {
  text: string;
  as?: ElementType;
  className?: string;
  triggerOnScroll?: boolean;
}

export const ShuffleText = ({
  text,
  as: Component = "div",
  className = "",
  triggerOnScroll = false,
  ...props
}: ShuffleTextProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const splitInstance = useRef<SplitType | null>(null);

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth > 900);
    };

    checkSize();

    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      // show the text without animation on mobile
      if (splitInstance.current) {
        splitInstance.current.revert();
        splitInstance.current = null;
      }
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }

    if (!containerRef.current) return;

    splitInstance.current = new SplitType(containerRef.current, {
      types: "lines,words,chars",
      tagName: "span",
    });

    // Apply layout styles with Tailwind-equivalent utilities via GSAP
    gsap.set(splitInstance.current.lines, { display: "block", width: "100%" });
    gsap.set(splitInstance.current.words, {
      display: "inline-block",
      whiteSpace: "nowrap",
      marginRight: "0.25em",
    });

    const chars = splitInstance.current.chars;
    const signs = ["+", "-"];

    gsap.set(chars, {
      opacity: 0,
      display: "inline-block",
      textAlign: "center",
      position: "relative",
      whiteSpace: "nowrap",
    });

    const animateChars = () => {
      chars?.forEach((char: Element) => {
        const originalLetter = char.textContent;
        let shuffleCount = 0;
        const maxShuffles = 5;

        gsap.to(char, {
          opacity: 1,
          duration: 0.1,
          delay: gsap.utils.random(0, 0.75),
          onStart: () => {
            const shuffle = () => {
              if (shuffleCount < maxShuffles) {
                char.textContent =
                  signs[Math.floor(Math.random() * signs.length)];
                shuffleCount++;
                requestAnimationFrame(() => setTimeout(shuffle, 75));
              } else {
                char.textContent = originalLetter;
              }
            };
            shuffle();
          },
        });
      });
    };

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom-=100",
        onEnter: () => {
          animateChars();
        },
        once: true,
      });
    } else {
      animateChars();
    }

    return () => {
      if (splitInstance.current) {
        splitInstance.current.revert();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text, triggerOnScroll, isDesktop]);

  return (
    <Component
      ref={containerRef}
      className={`block font-neue-montreal ${className}`.trim()}
      {...props}
    >
      {text}
    </Component>
  );
};
