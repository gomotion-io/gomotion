"use client";

import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (!res.ok) return;
        const json = await res.json();
        if (json?.data) {
          setIsLoggedIn(Boolean(json.data));
        }
      } catch (err) {
        console.error("Failed to fetch session", err);
      }
    };
    fetchSession();
  }, []);

  return (
    <div className="flex items-center justify-between h-20 w-full">
      <Link href="/">
        <div className="flex gap-2">
          <Image src="/gomotion.png" alt="gomotion" width={20} height={20} />
          <div className="font-bold">Gomotion</div>
        </div>
      </Link>
      <div className="flex items-center">
        {isLoggedIn ? (
          <SignOutButton />
        ) : (
          <>
            <Link href="/pricing">
              <Button variant="link">Start for free</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="link">Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
