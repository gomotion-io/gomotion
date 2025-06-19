"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/auth-js";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";
import Link from "next/link";

type ProfileProps = {
  user: User | null;
  profile: Profile | null;
};

export const Profile: FC<ProfileProps> = ({ user, profile }) => {
  const router = useRouter();
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-4">
        {profile?.subscription_status === "inactive" && (
          <Button size="sm">Upgrade</Button>
        )}
        <Button variant="outline" size="sm">
          5 credits
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="rounded-full" variant="outline">
            {user?.email?.charAt(0).toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-60" align="end">
          <DropdownMenuLabel className="text-stone-100/40">
            {user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/explore">
            <DropdownMenuItem>Explore</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
