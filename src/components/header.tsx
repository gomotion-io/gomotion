"use client";

import { Profile } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { User } from "@supabase/auth-js";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useRef } from "react";

type HeaderProps = {
  user: User | null;
};

export const Header: FunctionComponent<HeaderProps> = ({ user }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  // Register plugins once. gsap ignores duplicate registrations.
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

  useGSAP(() => {
    if (!headerRef.current) return;

    gsap.set(headerRef.current, { y: -20, opacity: 0 });
    gsap.to(headerRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.3,
      ease: "power4.out",
    });
  }, []);

  return (
    <div
      ref={headerRef}
      className="absolute z-50 flex items-center gap-10 h-[5rem] w-full px-5 sm:px-10 header justify-between"
    >
      <Link href="/">
        <div className="flex items-center gap-2">
          <div className="">
            <Image
              src="/images/gomotion.svg"
              alt="gomotion"
              width={20}
              height={20}
              unoptimized
            />
          </div>
        </div>
      </Link>
      <div className="flex items-center">
        {user ? (
          <Profile />
        ) : (
          <div className="flex gap-4">
            {!process.env.NEXT_PUBLIC_BETA && (
              <Link href="/pricing">
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Pricing
                </div>
              </Link>
            )}

            {process.env.NEXT_PUBLIC_BETA ? (
              <Link
                href="https://www.linkedin.com/company/gomotion-io"
                target="_blank"
              >
                <Button>Contact us</Button>
              </Link>
            ) : (
              <>
                <Link href="/sign-in">
                  <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                    Sign In
                  </div>
                </Link>
                <Link href="/register">
                  <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                    Register
                  </div>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
