"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { User } from "@supabase/auth-js";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Menu as MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent, useRef, useState } from "react";

type HeaderProps = {
  user: User | null;
};

export const Header: FunctionComponent<HeaderProps> = ({ user }) => {
  const pathname = usePathname();
  const shouldHide =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/explore") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password");

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

  if (shouldHide) {
    return null;
  }

  return (
    <div className="absolute z-50 top-0 w-full h-20 flex items-center">
      {/* Desktop / base header */}
      <div
        className="flex items-center justify-between max-w-[85rem] w-full h-full mx-auto px-5 lg:px-12"
        ref={headerRef}
      >
        <Link href="/">
          <div className="flex items-center gap-2 hover:opacity-70">
            <div>
              <Image
                src="/images/gomotion.svg"
                alt="gomotion"
                width={20}
                height={20}
                unoptimized
              />
            </div>
            <div className="text-xl font-neue-montreal font-bold">Gomotion</div>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/story">
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Our story
                </div>
              </Link>
              <Link
                href="https://discord.gg/emD6h74Fh7"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Join community
                </div>
              </Link>
              <Link href="/pricing">
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Pricing
                </div>
              </Link>
              <Link href="/explore">
                <Button size="sm">
                  Go to app <ArrowRight />{" "}
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link href="/story">
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Our story
                </div>
              </Link>
              <Link
                href="https://discord.gg/emD6h74Fh7"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Join community
                </div>
              </Link>
              <Link href="/pricing">
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Pricing
                </div>
              </Link>
              <Link
                href="/sign-in"
                className="hover:underline underline-offset-4"
              >
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Login
                </div>
              </Link>
              <Link href="/register">
                <Button className="font-medium py-2 px-5 text-sm rounded-full">
                  Get started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-4 sm:hidden">
          {!user?.id ? (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className=""
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          ) : (
            <Link href="/explore">
              <Button size="sm">
                Go to app <ArrowRight />{" "}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && !user?.id && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between px-5 h-20">
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
              className=""
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
              href="https://discord.gg/emD6h74Fh7"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline underline-offset-4"
            >
              Join community
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
                  Login
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    size="lg"
                    className="font-medium py-2 px-5 text-sm rounded-full"
                  >
                    Get started
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};
