"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import { User } from "@supabase/auth-js";
import { Profile } from "@/components/profile";
import { foundersGroteskBold } from "@/fonts";

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [supabase.auth]);

  return (
    <div className="flex items-center justify-between h-20 w-full">
      <Link href="/">
        <div className="flex items-center gap-2">
          <div>
            <Image src="/gomotion.png" alt="gomotion" width={20} height={20} />
          </div>
          <div className={`${foundersGroteskBold.className} text-[18px]`}>
            GOMOTION
          </div>
        </div>
      </Link>
      <div className="flex items-center">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Spinner className="text-stone-100" />
          </div>
        ) : user ? (
          <Profile user={user} />
        ) : (
          <>
            <Link href="/pricing">
              <Button variant="link">Start for free</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="link">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="link">Register</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
