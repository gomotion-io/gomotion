"use client";

import Capabilities from "@/components/landing-page/capabilities";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import Intro from "@/components/landing-page/intro";
import { Showcase } from "@/components/landing-page/showcase";
import { Usecase } from "@/components/landing-page/usecase";
import Footer from "@/components/landing-page/footer";

gsap.registerPlugin(useGSAP);

export default function LandingPage() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);

    const scene = document.querySelector(".scene");
    const introBtn = document.querySelector(".intro-button");
    const header = document.querySelector(".header");
    const capabilityPlayer = document.querySelector(".capability-player");
    const showcaseItems = gsap.utils.toArray<HTMLElement>(".showcase-item");
    const revealRows = gsap.utils.toArray<HTMLElement>(".reveal-row");
    const footerBg = document.querySelector(".footerBg");
    const footerImg = document.querySelector(".footerImg");
    const footerDescriptions = gsap.utils.toArray<HTMLElement>(
      ".footer-description",
    );
    const teamMembers = gsap.utils.toArray<HTMLElement>(".team-member");

    if (header) {
      gsap.set(header, { y: -20, opacity: 0 });
      gsap.to(header, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: "power4.out",
      });
    }

    if (scene) {
      gsap.set(scene, { y: 60, opacity: 0 });
      gsap.to(scene, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: "power4.out",
      });
    }

    if (introBtn) {
      gsap.set(introBtn, { opacity: 0 });
      gsap.to(introBtn, {
        opacity: 1,
        delay: 1,
        ease: "power3.out",
      });
    }

    if (capabilityPlayer) {
      gsap.from(capabilityPlayer, {
        scrollTrigger: {
          trigger: capabilityPlayer,
          scrub: true,
          start: "-80px bottom",
          end: "bottom+=400px bottom",
        },
        opacity: 0,
        scale: 0.5,
        ease: "power4.out",
      });
    }

    if (showcaseItems.length) {
      showcaseItems.forEach((item, i) => {
        gsap.set(item, { y: 40 * (i + 0.5), opacity: 0 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 105%",
              end: "top 50%",
              scrub: true,
            },
          })
          .to(item, {
            y: 0,
            opacity: 1,
            ease: "power3.Out",
          });
      });
    }

    if (revealRows.length) {
      revealRows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,

            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 60%",
              scrub: true,
            },
          },
        );
      });
    }

    if (footerBg && footerImg) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: footerBg,
          scrub: true,
          start: "top bottom-=700",
          end: "+=500px",
        },
      });

      timeline
        .from(footerBg, { clipPath: `inset(15%)` })
        .to(footerImg, { height: "200px" }, 0);
    }

    if (footerDescriptions.length) {
      footerDescriptions.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            scrub: true,
            start: "0px bottom",
            end: "bottom+=400px bottom",
          },
          opacity: 0,
          left: "-200px",
          ease: "power3.Out",
        });
      });
    }

    if (teamMembers.length) {
      teamMembers.forEach((member, i) => {
        gsap.set(member, { y: 40 * (i + 1), opacity: 0 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: member,
              start: "top 90%",
              end: "top 40%",
              scrub: true,
            },
          })
          .to(member, {
            y: 0,
            opacity: 1,
            ease: "power3.Out",
          });
      });
    }
  }, []);

  return (
    <div>
      <Intro />
      <Capabilities />
      <Showcase />
      <Usecase />
      <Footer />
    </div>
  );
}
