"use client";

import { Profile } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { User } from "@supabase/auth-js";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu as MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useRef, useState } from "react";

type HeaderProps = {
  user: User | null;
};

export const Header: FunctionComponent<HeaderProps> = ({ user }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <>
      {/* Desktop / base header */}
      <div
        ref={headerRef}
        className="absolute z-50 flex items-center gap-10 h-[5rem] w-full px-5 sm:px-10 header justify-between"
      >
        <Link href="/">
          <div className="flex items-center gap-2">
            <div>
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

        {/* Desktop navigation */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <Profile />
          ) : (
            <>
              <Link href="/story">
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Our story
                </div>
              </Link>
              <Link href="/pricing">
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Pricing
                </div>
              </Link>
              <Link href="/sign-in">
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Sign In
                </div>
              </Link>
              <Link href="/explore">
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile actions */}

        <div className="flex items-center gap-4 sm:hidden">
          {user && <Profile />}

          {!user?.id && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-md p-2 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && !user?.id && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between px-5 h-[5rem]">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <div>
                <Image
                  src="/images/gomotion.svg"
                  alt="gomotion"
                  width={20}
                  height={20}
                  unoptimized
                />
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="rounded-md p-2 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="mt-4 flex flex-col items-center gap-6 text-lg font-semibold">
            <Link
              href="/story"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline underline-offset-4"
            >
              Our story
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline underline-offset-4"
            >
              Pricing
            </Link>
            {user ? (
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:underline underline-offset-4"
              >
                Go to app
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:underline underline-offset-4"
                >
                  Sign In
                </Link>
                <Link href="/explore" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm">Get started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
};
