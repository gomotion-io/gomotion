import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import Philippe from "../../../../public/images/team-philippe.jpg";
import Lionel from "../../../../public/images/team-tatkeu.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Team = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const members =
      containerRef.current.querySelectorAll<HTMLElement>(".team-member");

    members.forEach((member, i) => {
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
  }, []);

  return (
    <div
      ref={containerRef}
      id="our-team"
      className="flex flex-col xl:flex-row gap-10 px-5 sm:px-20 lg:px-40 mt-24 z-50"
    >
      <div className="team-member flex  flex-col lg:flex-row gap-7">
        <div className="relative h-[26rem] aspect-[12/16] overflow-hidden">
          <Image
            style={{ objectFit: "cover" }}
            src={Philippe}
            alt="image"
            fill
          />
        </div>

        <div>
          <div className="text-2xl font-semibold uppercase">
            Philippe Tedajo
          </div>
          <div className="text-lg font-medium text-stone-400">Co-founder</div>
          <div className="text-md font-medium text-stone-400 mb-5">
            Senior Software Engineer
          </div>

          <div className="sm:max-w-xs leading-loose">
            Armed with over a decade of experience across the globe, he builds
            the rock-solid backbone that powers Gomotion&apos;s instant video.
          </div>
        </div>
      </div>

      <div className="team-member flex  flex-col lg:flex-row gap-7">
        <div className="relative h-[26rem] aspect-[12/16] overflow-hidden">
          <Image style={{ objectFit: "cover" }} src={Lionel} alt="image" fill />
        </div>

        <div>
          <div className="text-2xl font-semibold uppercase">Lionel Tatkeu</div>
          <div className="text-lg font-medium text-stone-400">Co-founder</div>
          <div className="text-md font-medium text-stone-400 mb-5">
            Senior Data Scientist
          </div>

          <div className="sm:max-w-xs leading-loose">
            Fueled by a PhD in machine learning and a relentless curiosity, he
            transforms raw viewership data into cinematic gold.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
