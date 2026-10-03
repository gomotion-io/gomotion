import { createClient } from "@/supabase/client";
import { create } from "zustand/index";

export type OAuthProvider = "google" | "github";

type AuthState = {
  pendingProvider: OAuthProvider | null;
  error: string | null;
  signInWithProvider: (provider: OAuthProvider) => Promise<void>;
  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  pendingProvider: null,
  error: null,
  signInWithProvider: async (provider) => {
    set({ pendingProvider: provider, error: null });
    const supabase = createClient();

    // The callback must be on the current origin: the PKCE code verifier
    // cookie is set on it before redirecting to the provider.
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/explore`,
      },
    });

    // On success the browser is redirected to the provider
    if (error) {
      set({ error: error.message, pendingProvider: null });
    }
  },
  reset: () => set({ pendingProvider: null, error: null }),
}));
