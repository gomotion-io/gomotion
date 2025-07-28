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
import { useCountStore } from "@/store/count.store";
import { formatCredits } from "@/lib/utils";

type MenuProps = {
  user: User | null;
  logout: () => void;
};

export const Menu: FC<MenuProps> = ({ user, logout }) => {
  const credits = useCountStore((state) => state.credits);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="rounded-full" variant="outline">
          {user?.email?.charAt(0).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-60" align="end">
        <DropdownMenuLabel className="font-medium truncate max-w-[14rem] flex justify-between">
          <div>Available credits</div> <div>{formatCredits(credits)}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/explore">
          <DropdownMenuItem className="text-muted-foreground">
            Our story
          </DropdownMenuItem>
        </Link>
        <Link href="/pricing">
          <DropdownMenuItem className="text-muted-foreground">
            Pricing
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="text-muted-foreground" onClick={logout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
