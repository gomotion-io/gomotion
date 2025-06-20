import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Profile } from "@/components/profile";
import { foundersGroteskBold } from "@/fonts";
import { getUser } from "@/supabase/server-functions/users";
import { getProfile } from "@/supabase/server-functions/profile";

export const Header = async () => {
  const user = await getUser();
  let profile = null;

  if (user) {
    profile = await getProfile(user?.id);
  }

  return (
    <div className="flex items-center justify-between h-[5rem] w-full">
      <Link href="/">
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Image src="/gomotion.png" alt="gomotion" width={20} height={20} />
          </div>
          <div className={`${foundersGroteskBold.className} text-[18px]`}>
            GOMOTION
          </div>
        </div>
      </Link>
      <div className="flex items-center">
        {user ? (
          <Profile user={user} profile={profile} />
        ) : (
          <div className="flex gap-4">
            <Link href="/pricing">
              <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                Get started
              </div>
            </Link>
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
          </div>
        )}
      </div>
    </div>
  );
};
