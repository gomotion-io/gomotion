"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";

// Register plugin once at module scope
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LABELS = [
  "After Effects",
  "Cinema 4D",
  "Blender",
  "Figma",
  "Lottie",
  "SVG Animation",
  "Spline",
  "Easing",
  "Motion Graphics",
  "Transitions",
  "Timing Curves",
  "Rive",
] as const;

const COLOR_CLASSES = [
  "text-fuchsia-900 bg-fuchsia-100",
  "text-emerald-900 bg-emerald-100",
  "text-amber-900 bg-amber-100",
  "text-black bg-stone-100",
] as const;

export default function MotionFooter() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Ensure code only runs client-side
    if (!sectionRef.current) return;

    let engine: any;
    let runner: any;

    // @ts-expect-error – matter-js has no type declarations installed
    Promise.all([import("matter-js")]).then(([Matter]) => {
      const {
        Engine,
        Runner,
        Mouse,
        MouseConstraint,
        Bodies,
        World,
        Body,
        Events,
      } = Matter;

      const animateOnScroll = true;

      const config = {
        gravity: { x: 0, y: 1 },
        restitution: 0.5,
        friction: 0.15,
        frictionAir: 0.02,
        density: 0.002,
        wallThickness: 200,
        mouseStiffness: 0.6,
      } as const;

      const clamp = (val: number, min: number, max: number) =>
        Math.max(min, Math.min(max, val));

      const bodies: Array<{
        body: any;
        element: HTMLElement;
        width: number;
        height: number;
      }> = [];

      const initPhysics = (container: HTMLElement) => {
        engine = Engine.create();
        engine.gravity = config.gravity;
        engine.constraintIterations = 10;
        engine.positionIterations = 20;
        engine.velocityIterations = 16;
        engine.timing.timeScale = 1;

        const containerRect = container.getBoundingClientRect();
        const wallT = config.wallThickness;

        // Ground & side walls
        const walls = [
          Bodies.rectangle(
            containerRect.width / 2,
            containerRect.height + wallT / 2,
            containerRect.width + wallT * 2,
            wallT,
            { isStatic: true }
          ),
          Bodies.rectangle(
            -wallT / 2,
            containerRect.height / 2,
            wallT,
            containerRect.height + wallT * 2,
            { isStatic: true }
          ),
          Bodies.rectangle(
            containerRect.width + wallT / 2,
            containerRect.height / 2,
            wallT,
            containerRect.height + wallT * 2,
            { isStatic: true }
          ),
        ];
        World.add(engine.world, walls);

        // Create bodies for each label element
        const objects = container.querySelectorAll<HTMLElement>(".object");
        objects.forEach((obj, index) => {
          const objRect = obj.getBoundingClientRect();
          const startX =
            Math.random() * (containerRect.width - objRect.width) +
            objRect.width / 2;
          const startY = -500 - index * 200;
          const startRotation = (Math.random() - 0.5) * Math.PI;

          const body = Bodies.rectangle(
            startX,
            startY,
            objRect.width,
            objRect.height,
            {
              restitution: config.restitution,
              friction: config.friction,
              frictionAir: config.frictionAir,
              density: config.density,
            }
          );

          Body.setAngle(body, startRotation);

          bodies.push({
            body,
            element: obj,
            width: objRect.width,
            height: objRect.height,
          });

          World.add(engine.world, body);
        });

        // Create top wall after delay so objects can fall in first
        setTimeout(() => {
          const topWall = Bodies.rectangle(
            containerRect.width / 2,
            -wallT / 2,
            containerRect.width + wallT * 2,
            wallT,
            { isStatic: true }
          );
          World.add(engine.world, topWall);
        }, 3000);

        // Mouse interaction
        const mouse = Mouse.create(container);
        mouse.element.removeEventListener(
          "mousewheel",
          (mouse as any).mousewheel
        );
        mouse.element.removeEventListener(
          "DOMMouseScroll",
          (mouse as any).mousewheel
        );

        const mouseConstraint = MouseConstraint.create(engine, {
          mouse,
          constraint: {
            stiffness: config.mouseStiffness,
            render: { visible: false },
          },
        });

        mouseConstraint.mouse.element.oncontextmenu = () => false;

        let dragging: any = null;
        let originalInertia: number | null = null;

        Events.on(mouseConstraint, "startdrag", (event: any) => {
          dragging = event.body;
          if (dragging) {
            originalInertia = dragging.inertia;
            Body.setInertia(dragging, Infinity);
            Body.setVelocity(dragging, { x: 0, y: 0 });
            Body.setAngularVelocity(dragging, 0);
          }
        });

        Events.on(mouseConstraint, "enddrag", () => {
          if (dragging) {
            Body.setInertia(dragging, originalInertia || 1);
            dragging = null;
            originalInertia = null;
          }
        });

        Events.on(engine, "beforeUpdate", () => {
          if (dragging) {
            const found = bodies.find((b) => b.body === dragging);
            if (found) {
              const minX = found.width / 2;
              const maxX = containerRect.width - found.width / 2;
              const minY = found.height / 2;
              const maxY = containerRect.height - found.height / 2;

              Body.setPosition(dragging, {
                x: clamp(dragging.position.x, minX, maxX),
                y: clamp(dragging.position.y, minY, maxY),
              });

              Body.setVelocity(dragging, {
                x: clamp(dragging.velocity.x, -20, 20),
                y: clamp(dragging.velocity.y, -20, 20),
              });
            }
          }
        });

        container.addEventListener("mouseleave", () => {
          mouseConstraint.constraint.bodyB = null;
          mouseConstraint.constraint.pointB = null;
        });
        document.addEventListener("mouseup", () => {
          mouseConstraint.constraint.bodyB = null;
          mouseConstraint.constraint.pointB = null;
        });

        World.add(engine.world, mouseConstraint);

        runner = Runner.create();
        Runner.run(runner, engine);

        const updatePositions = () => {
          bodies.forEach(({ body, element, width, height }) => {
            const x = clamp(
              body.position.x - width / 2,
              0,
              containerRect.width - width
            );
            const y = clamp(
              body.position.y - height / 2,
              -height * 3,
              containerRect.height - height
            );

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            element.style.transform = `rotate(${body.angle}rad)`;
          });

          requestAnimationFrame(updatePositions);
        };
        updatePositions();
      };

      const container =
        sectionRef.current!.querySelector<HTMLElement>(".object-container");
      if (!container) return;

      if (animateOnScroll) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          once: true,
          onEnter: () => initPhysics(container),
        });
      } else {
        initPhysics(container);
      }
    });

    // Cleanup on unmount
    return () => {
      if (runner) {
        try {
          runner.enabled = false;
        } catch {
          // ignore
        }
      }
      if (engine) {
        try {
          engine.events = {};
        } catch {
          // ignore
        }
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] bg-neutral-50 overflow-hidden rounded-t-3xl"
    >
      <div className="object-container absolute inset-0">
        {LABELS.map((label, index) => {
          const colorClass = COLOR_CLASSES[index % COLOR_CLASSES.length];
          return (
            <div
              key={label}
              className={`object absolute w-max px-6 py-4 rounded-full font-medium text-2xl cursor-grab select-none pointer-events-auto z-20 ${colorClass}`}
            >
              <p>{label}</p>
            </div>
          );
        })}
      </div>

      <div className="footer-content absolute inset-0 flex flex-col px-10 gap-8 py-24 pointer-events-auto">
        <h2 className="text-5xl sm:text-6xl font-neue-montreal font-bold max-w-3xl leading-[1.2em] ">
          Crafting motion stories that move ideas forward
        </h2>

        <h3 className="text-xl leading-relaxed max-w-xl text-muted-foreground">
          Combining unique design and rich technology, we build immersive
          stories exactly as they were meant to be told—without shortcuts or
          compromises.
        </h3>

        <div className="flex flex-wrap text-2xl font-semibold gap-6 sm:flex-col sm:self-end sm:items-end">
          <Link
            href="https://www.linkedin.com/company/gomotion-io"
            className="hover:underline underline-offset-4"
          >
            Linkedin
          </Link>
          <Link
            href="https://www.youtube.com/@gomotion-io"
            className="hover:underline underline-offset-4"
          >
            Youtube
          </Link>
          <Link
            href="https://www.tiktok.com/@gomotion.io"
            className="hover:underline underline-offset-4"
          >
            Tiktok
          </Link>
          <Link
            href="https://discord.gg/Wd4nCJhCgd"
            target="_blank"
            className="hover:underline underline-offset-4 "
          >
            Discord
          </Link>
          {/* Terms & Legal */}
          <Link href="/terms" className="hover:underline underline-offset-4">
            Terms &amp; Legal
          </Link>
        </div>
      </div>
    </section>
  );
}
