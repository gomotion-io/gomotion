"use client";

import { ProfileData } from "@/_type";
import { Button } from "@/components/ui/button";
import { CREDIT_FACTOR } from "@/constant";
import { formatCredits } from "@/lib/utils";
import { createClient } from "@/supabase/client";
import { getCounts } from "@/supabase/server-functions/counts";
import { User } from "@supabase/auth-js";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { VideoHistory } from "@/components/video-history";
import { Menu } from "@/components/menu";

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
      <VideoHistory />
      <Menu logout={logout} user={user} />
    </div>
  );
};
