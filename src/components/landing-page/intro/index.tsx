"use client";
import "./home.css";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import DynamicBackground from "@/components/landing-page/intro/dynamic-background";
import Copy from "@/components/landing-page/intro/copy";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Intro() {
  useGSAP(() => {
    const heroLink = document.querySelector(".hero-link");
    const animationDelay = 0.9;

    if (heroLink) {
      gsap.set(heroLink, { y: 30, opacity: 0 });

      gsap.to(heroLink, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: animationDelay,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <>
      <section className="hero">
        <DynamicBackground logoPath="/images/logos/logo_light.png" />

        <div className="hero-content">
          <div className="hero-header">
            <div className="hero-header-col-lg"></div>
            <div className="hero-header-col-sm">
              <Copy animateOnScroll={false} delay={0.9}>
                <h3>
                  Systems thinking and creative execution brought into web
                  development for consistent outcomes.
                </h3>
              </Copy>
            </div>
          </div>

          <div className="hero-footer">
            <div className="hero-footer-col-lg">
              <Copy animateOnScroll={false} delay={0.9}>
                <p className="sm caps mono">Studios</p>
                <p className="sm caps mono">Toronto and Copenhagen</p>
              </Copy>
            </div>
            <div className="hero-footer-col-sm">
              <div className="hero-tags">
                <Copy animateOnScroll={false} delay={0.9}>
                  <p className="sm caps mono">Web Systems</p>
                  <p className="sm caps mono">Interface Design</p>
                  <p className="sm caps mono">Creative Development</p>
                  <p className="sm caps mono">End to End Delivery</p>
                </Copy>
              </div>

              <div className="hero-link">
                {/*<BtnLink route="/contact" label="contact" />*/}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
