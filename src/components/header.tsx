import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex items-center justify-between h-20 w-full">
      <Link href="/">
        <div className="flex gap-2">
          <Image src="/gomotion.png" alt="gomotion" width={20} height={20} />
          <div className="font-bold">Gomotion</div>
        </div>
      </Link>
      <div className="flex items-center">
        <Link href="/pricing">
          <Button variant="link">Start for free</Button>
        </Link>

        <Link href="/sign-in">
          <Button variant="link">Sign In</Button>
        </Link>
      </div>
    </div>
  );
};
