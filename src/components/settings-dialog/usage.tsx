import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Skeleton } from "@/components/ui/skeleton";
import { CREDIT_FACTOR } from "@/constant";
import { formatCredits } from "@/lib/utils";
import { useCountStore } from "@/store/count.store";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";

export default function Usage() {
  const { profile } = useUserStore();
  const { credits, loading, fetchCounts } = useCountStore();

  useEffect(() => {
    if (profile?.id && profile?.products?.limit) {
      fetchCounts(profile.id, profile.products.limit);
      useCountStore.getState().subscribe(profile.id, profile.products.limit);
    }
  }, [profile, fetchCounts]);

  if (loading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (!profile?.products?.limit) {
    return <div>No subscription data available.</div>;
  }

  const total = profile.products.limit * CREDIT_FACTOR;
  const remaining = credits ?? 0;
  const used = total - remaining;
  const percentage = total > 0 ? (used / total) * 100 : 0;

  return (
    <Card className="w-full bg-neutral-50 border-none">
      <CardHeader className="space-y-1 mb-5">
        <CardTitle>Credit Usage</CardTitle>
        <CardDescription>Your credit usage is shown below.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <CircularProgress progress={percentage} size={128} strokeWidth={10} />
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Used</p>
            <p className="text-2xl font-bold">{formatCredits(used)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="text-2xl font-bold">{formatCredits(remaining)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{formatCredits(total)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
