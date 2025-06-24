import { CREDIT_FACTOR } from "@/constant";
import { createClient } from "@/supabase/client";
import { getCounts } from "@/supabase/server-functions/counts";
import { create } from "zustand";

export type CountState = {
  usage: number;
  credits: number | null;
  loading: boolean;
  fetchCounts: (profileId: string, limit: number) => Promise<void>;
  subscribe: (profileId: string, limit: number) => void;
};

export const useCountStore = create<CountState>((set) => ({
  usage: 0,
  credits: null,
  loading: false,

  fetchCounts: async (profileId, limit) => {
    try {
      set({ loading: true });
      const count = await getCounts(profileId);

      const credits = (limit - count) * CREDIT_FACTOR;
      set({ usage: count, credits });
    } catch (error) {
      // We intentionally swallow the error here and keep existing state.
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  subscribe: (profileId, limit) => {
    const supabase = createClient();

    supabase
      .channel(`counts-${profileId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "counts",
          filter: `profile_id=eq.${profileId}`,
        },
        () => {
          set((state) => {
            const usage = state.usage + 1;
            return {
              usage,
              credits: (limit - usage) * CREDIT_FACTOR,
            };
          });
        },
      )
      .subscribe();
  },
}));
