"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/store/user.store";
import Image from "next/image";
import { useMemo } from "react";

export default function ProfileSettings() {
  const { user, profile } = useUserStore();

  const planName = useMemo(() => {
    if (!profile?.products?.variant_id) return "Free";
    // Heuristic: derive name from variant_id when available; fallback on status
    if (profile.products.variant_id === "free") return "Free";
    if (profile.subscription_status === "active") return "Subscribed";
    return "Unknown";
  }, [profile]);

  return (
    <Card className="w-full bg-neutral-50 border-none">
      <CardHeader className="space-y-1 mb-5">
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Account and subscription details.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt="Avatar"
                width={48}
                height={48}
              />
            ) : (
              <span className="text-sm text-neutral-600">
                {(profile?.full_name || user?.email || "U")
                  .slice(0, 1)
                  .toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm text-neutral-500">Signed in as</div>
            <div className="text-lg font-medium">
              {profile?.full_name || user?.email || "Unknown"}
            </div>
            <div className="text-sm text-neutral-500">{user?.email}</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{planName} Plan</Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <a href="/pricing">Upgrade</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
