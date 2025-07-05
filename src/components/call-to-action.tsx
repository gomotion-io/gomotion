import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

export const CallToAction = () => {
  // Register plugins once. gsap ignores duplicate registrations.
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

  const scrollTo = useCallback(() => {
    gsap.to(window, { duration: 2, scrollTo: "#our-team" });
  }, []);

  return process.env.NEXT_PUBLIC_BETA ? (
    <Button size="lg" onClick={scrollTo}>
      Contact us <ArrowRight />
    </Button>
  ) : (
    <Link href="/register">
      <Button size="lg">
        Start for free <ArrowRight />
      </Button>
    </Link>
  );
};
