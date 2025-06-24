import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@supabase/auth-js";

type MenuProps = {
  user: User | null;
  logout: () => void;
};

export const Menu: FC<MenuProps> = ({ user, logout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="rounded-full" variant="outline">
          {user?.email?.charAt(0).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-60" align="end">
        <DropdownMenuLabel className="text-stone-100/50 truncate max-w-[14rem]">
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
  );
};
