import { create } from "zustand/index";
import { getEnvUrl } from "@/lib/utils";
import { createClient } from "@/supabase/client";

type AuthState = {
  loading: boolean;
  error: string | null;
  signIn: ({ email }: { email: string }) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  signIn: async ({ email }) => {
    const supabase = createClient();
    set({ loading: true });

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: getEnvUrl(),
      },
    });
    if (!error && !data.user) {
      window.location.href = `/mail-sent`;
    }
    set({ loading: false });
  },
}));
