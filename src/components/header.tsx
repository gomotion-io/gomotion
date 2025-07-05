"use client";

import { Profile } from "@/components/profile";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { User } from "@supabase/auth-js";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type HeaderProps = {
  user: User | null;
};

export const Header: FunctionComponent<HeaderProps> = ({ user }) => {
  const pathname = usePathname();
  const isExplorePage = pathname.startsWith("/explore");

  return (
    <div
      className={cn(
        "absolute z-50 flex items-center gap-10 h-[5rem] w-full px-5 sm:px-10 header",
        isExplorePage && "justify-between",
      )}
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
          <Profile isExplorePage={isExplorePage} />
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
              <Link href="/contact-us">
                <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                  Contact us
                </div>
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
