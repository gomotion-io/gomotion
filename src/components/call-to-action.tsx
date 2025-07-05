import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FC, useCallback } from "react";

type CallToActionProps = {
  className?: string;
};

export const CallToAction: FC<CallToActionProps> = ({ className }) => {
  // Register plugins once. gsap ignores duplicate registrations.
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

  const scrollTo = useCallback(() => {
    gsap.to(window, { duration: 2, scrollTo: "#our-team" });
  }, []);

  return process.env.NEXT_PUBLIC_BETA ? (
    <Button size="lg" onClick={scrollTo} className={className}>
      Contact us <ArrowRight />
    </Button>
  ) : (
    <Link href="/register" className={className}>
      <Button size="lg">
        Start for free <ArrowRight />
      </Button>
    </Link>
  );
};
