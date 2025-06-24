"use client";

import { ProfileData } from "@/_type";
import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { VideoHistory } from "@/components/video-history";
import { formatCredits } from "@/lib/utils";
import { useCountStore } from "@/store/count.store";
import { createClient } from "@/supabase/client";
import { User } from "@supabase/auth-js";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

type ProfileProps = {
  user: User | null;
  profile: ProfileData | null;
};

export const Profile: FC<ProfileProps> = ({ user, profile }) => {
  const router = useRouter();
  const supabase = createClient();
  const { credits, fetchCounts, subscribe } = useCountStore();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  useEffect(() => {
    if (profile?.id && profile?.products) {
      const limit = (profile.products as Product).limit;
      fetchCounts(profile.id, limit).catch(console.error);
      subscribe(profile.id, limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
