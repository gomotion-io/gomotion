import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CallToAction = () => {
  return process.env.NEXT_PUBLIC_BETA ? (
    <Link href="/contact-us">
      <Button size="lg">
        Contact us <ArrowRight />
      </Button>
    </Link>
  ) : (
    <Link href="/register">
      <Button size="lg">
        Start for free <ArrowRight />
      </Button>
    </Link>
  );
};
