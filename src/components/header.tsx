import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex items-center justify-between h-16 w-full mx-auto max-w-3xl">
      <Link href="/">
        <div className="flex gap-2">
          <Image src="/gomotion.png" alt="gomotion" width={20} height={20} />
          <div className="font-bold">Gomotion</div>
        </div>
      </Link>
      <div className="flex items-center">
        <Link href="/pricing">
          <Button variant="link">Start your free trial</Button>
        </Link>

        <Link href="/sign-in">
          <Button variant="link">Sign In</Button>
        </Link>
      </div>
    </div>
  );
};
