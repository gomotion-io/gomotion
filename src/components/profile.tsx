"use client";

import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { VideoHistory } from "@/components/video-history";
import { formatCredits } from "@/lib/utils";
import { useCountStore } from "@/store/count.store";
import { useUserStore } from "@/store/user.store";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Profile: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isExplorePage = pathname === "/explore";
  const { user, profile, signOut } = useUserStore();
  const { credits } = useCountStore();

  const logout = async () => {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  };

  return isExplorePage ? (
    <div className="flex items-center gap-3">
      <div className="flex  items-center gap-3">
        {profile?.subscription_status === "inactive" && (
          <Button size="sm" onClick={() => router.push("/pricing")}>
            Upgrade
          </Button>
        )}
        <Button variant="outline" size="sm">
          {formatCredits(credits)}
        </Button>
        <VideoHistory />
      </div>
      <Menu logout={logout} user={user} />
    </div>
  ) : (
    <div className="flex items-center gap-4">
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
  );
};
