"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pages = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Our Story",
      href: "/story",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
  ];

  const socials = [
    {
      title: "Linkedin",
      href: "https://www.linkedin.com/company/gomotion-io",
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com/gomotion.io",
    },
    {
      title: "Tiktok",
      href: "https://www.tiktok.com/@gomotion.io",
    },
    {
      title: "Youtube",
      href: "https://www.youtube.com/@gomotion-io",
    },
    {
      title: "Discord",
      href: "https://discord.gg/Wd4nCJhCgd",
    },
  ];

  const legals = [
    {
      title: "Terms",
      href: "/terms",
    },
  ];

  const signups = [
    {
      title: "Sign Up",
      href: "/register",
    },
    {
      title: "Login",
      href: "/sign-in",
    },
  ];

  const pathname = usePathname();
  const shouldHide =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/explore") ||
    pathname.startsWith("/register");

  if (shouldHide) {
    return null;
  }

  return (
    <div className="px-8 py-20 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start  md:px-8">
        <div>
          <div className="mr-0 md:mr-4 md:flex mb-4">
            <Logo />
          </div>

          <div className="mt-2 ml-2">
            &copy; copyright AgenticLabs 2025. All rights reserved.
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 items-start mt-10 sm:mt-0 md:mt-0">
          <div className="flex justify-center space-y-4 flex-col w-full">
            <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">
              Pages
            </p>
            <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
              {pages.map((page, idx) => (
                <li key={"pages" + idx} className="list-none">
                  <Link
                    className="transition-colors hover:text-text-neutral-800 "
                    href={page.href}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center space-y-4 flex-col">
            <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">
              Socials
            </p>
            <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
              {socials.map((social, idx) => (
                <li key={"social" + idx} className="list-none">
                  <Link
                    className="transition-colors hover:text-text-neutral-800 "
                    href={social.href}
                  >
                    {social.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center space-y-4 flex-col">
            <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">
              Register
            </p>
            <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
              {signups.map((auth, idx) => (
                <li key={"auth" + idx} className="list-none">
                  <Link
                    className="transition-colors hover:text-text-neutral-800 "
                    href={auth.href}
                  >
                    {auth.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center space-y-4 flex-col">
            <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">
              Legal
            </p>
            <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
              {legals.map((legal, idx) => (
                <li key={"legal" + idx} className="list-none">
                  <Link
                    className="transition-colors hover:text-text-neutral-800 "
                    href={legal.href}
                  >
                    {legal.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="text-center mt-20 text-5xl md:text-9xl lg:text-[12rem] xl:text-[13rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">
        GOMOTION
      </p>
    </div>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4  text-black px-2 py-1  relative z-20"
    >
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
  );
};
