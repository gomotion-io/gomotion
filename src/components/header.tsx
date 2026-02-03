"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { User } from "@supabase/auth-js";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Github, Menu as MenuIcon, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent, useEffect, useRef, useState } from "react";

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
  const [starCount, setStarCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/gomotion-io/gomotion")
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

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
    <div className="absolute z-50 top-0 w-full h-16 sm:h-20 flex items-center">
      <div
        className="flex items-center justify-between max-w-[85rem] w-full h-full mx-auto px-5 lg:px-12"
        ref={headerRef}
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <Image
              src="/images/gomotion.svg"
              alt="gomotion"
              width={20}
              height={20}
              unoptimized
            />
            <span className="text-lg sm:text-xl font-neue-montreal font-bold">
              Gomotion
            </span>
          </Link>
        </div>

        {/* Desktop navigation (items unchanged, softer styling only) */}
        <div className="hidden sm:flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-6">
              <Link
                href="/story"
                className="text-sm font-semibold hover:underline underline-offset-4"
              >
                Our story
              </Link>
              <Link
                href="/how-to"
                className="text-sm font-semibold hover:underline underline-offset-4"
              >
                How to
              </Link>
              <Link
                href="https://discord.gg/Wd4nCJhCgd"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold hover:underline underline-offset-4"
              >
                Join our Discord
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-semibold hover:underline underline-offset-4"
              >
                Pricing
              </Link>
              <Link href="/explore">
                <Button
                  size="sm"
                  className="rounded-full px-4 py-2 text-sm shadow-sm"
                >
                  Go to app <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/story"
                className="text-sm font-semibold hover:underline underline-offset-4"
              >
                Our story
              </Link>
              <Link
                href="/how-to"
                className="text-sm font-semibold hover:underline underline-offset-4"
              >
                How to
              </Link>
              <Link
                href="https://discord.gg/Wd4nCJhCgd"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold hover:underline underline-offset-4"
              >
                Join our Discord
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-semibold hover:underline underline-offset-4"
              >
                Pricing
              </Link>
              <Link
                href="/sign-in"
                className="text-sm font-semibold hover:underline underline-offset-4"
              >
                Login
              </Link>
              <a
                href="https://github.com/gomotion-io/gomotion"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors text-sm"
              >
                <Github className="h-4 w-4" />
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="font-medium tabular-nums">
                  {starCount !== null ? starCount.toLocaleString() : "—"}
                </span>
              </a>
              <Link href="/register">
                <Button className="rounded-full px-4 py-2 text-sm shadow-sm font-medium">
                  Get started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile actions (unchanged logic) */}
        <div className="flex items-center gap-3 sm:hidden">
          {!user?.id ? (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          ) : (
            <Link href="/explore">
              <Button size="sm" className="rounded-full px-3 py-1.5 text-xs">
                Go to app <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu (unchanged features, just lighter spacing) */}
      {mobileMenuOpen && !user?.id && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between px-5 h-16 sm:h-20">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <Image
                src="/images/gomotion.svg"
                alt="gomotion"
                width={20}
                height={20}
                unoptimized
              />
              <span className="font-semibold">Gomotion</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="mt-4 flex flex-col items-center gap-6 text-lg font-semibold">
            <a
              href="https://github.com/gomotion-io/gomotion-agent"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <Github className="h-4 w-4" />
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              <span className="font-medium tabular-nums">
                {starCount !== null ? starCount.toLocaleString() : "—"}
              </span>
            </a>
            <Link
              href="/story"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline underline-offset-4"
            >
              Our story
            </Link>
            <Link
              href="/how-to"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline underline-offset-4"
            >
              How to
            </Link>
            <Link
              href="https://discord.gg/Wd4nCJhCgd"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline underline-offset-4"
            >
              Join our Discord
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline underline-offset-4"
            >
              Pricing
            </Link>
            <Link
              href="/sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline underline-offset-4"
            >
              Login
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button size="lg" className="rounded-full">
                Get started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};
