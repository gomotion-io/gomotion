"use client";

import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { VideoHistory } from "@/components/video-history";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { formatCredits } from "@/lib/utils";
import { useCountStore } from "@/store/count.store";

export const Profile: FC = () => {
  const router = useRouter();
  const { user, profile, signOut } = useUserStore();
  const { credits } = useCountStore();

  const logout = async () => {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  };

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
      <VideoHistory />
      <Menu logout={logout} user={user} />
    </div>
  );
};
