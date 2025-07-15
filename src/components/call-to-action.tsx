import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type CallToActionProps = {
  className?: string;
};

export const CallToAction: FC<CallToActionProps> = ({ className }) => {
  return process.env.NEXT_PUBLIC_BETA ? (
    <Link href="https://www.linkedin.com/company/gomotion-io" target="_blank">
      <Button size="lg" className={className}>
        Contact us <ArrowRight />
      </Button>
    </Link>
  ) : (
    <Link href="/register" className={className}>
      <Button size="lg">
        Start for free <ArrowRight />
      </Button>
    </Link>
  );
};
