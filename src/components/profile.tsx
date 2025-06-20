"use client";

import { ProfileData } from "@/_type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CREDIT_FACTOR } from "@/constant";
import { formatCredits } from "@/lib/utils";
import { createClient } from "@/supabase/client";
import { getCounts } from "@/supabase/server-functions/counts";
import { User } from "@supabase/auth-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

type ProfileProps = {
  user: User | null;
  profile: ProfileData | null;
};

export const Profile: FC<ProfileProps> = ({ user, profile }) => {
  const router = useRouter();
  const supabase = createClient();
  const [credits, setCredits] = useState<number | null>(null);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  useEffect(() => {
    if (profile?.id) {
      getCounts(profile?.id)
        .then((count) => {
          const total = (profile?.products as Product)?.limit;
          const credits = total - count;
          setCredits(credits * CREDIT_FACTOR);
        })
        .catch(console.error);
    }
  }, [profile?.id, profile?.products]);

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-3">
        {profile?.subscription_status === "inactive" && (
          <Button size="sm" onClick={() => router.push("/pricing")}>
            Upgrade
          </Button>
        )}
        <Button variant="outline" size="sm">
          {credits ? formatCredits(credits) : " credits"}
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="rounded-full" variant="outline">
            {user?.email?.charAt(0).toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-60" align="end">
          <DropdownMenuLabel className="text-stone-100/40 truncate max-w-[14rem]">
            {user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/explore">
            <DropdownMenuItem>Explore</DropdownMenuItem>
          </Link>
          <Link href="/pricing">
            <DropdownMenuItem>Pricing</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
