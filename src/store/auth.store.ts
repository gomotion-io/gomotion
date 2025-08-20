import { getEnvUrl } from "@/lib/utils";
import { createClient } from "@/supabase/client";
import { create } from "zustand/index";

type AuthState = {
  loading: boolean;
  error: string | null;
  mailSent: boolean;
  register: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  forgotPassword: ({ email }: { email: string }) => Promise<void>;
  updatePassword: ({ password }: { password: string }) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  mailSent: false,
  register: async ({ email, password }) => {
    const supabase = createClient();
    set({ mailSent: false, loading: true, error: null });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getEnvUrl(),
      },
    });

    if (!error && data.user) {
      set({ mailSent: true, loading: false });
      return;
    }

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    set({ loading: false });
  },
  signIn: async ({ email, password }) => {
    set({ loading: true, error: null, mailSent: false });
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    console.log(data, error);
    if (data.user) {
      window.location.href = "/explore";
      return;
    }

    set({ loading: false });
  },
  forgotPassword: async ({ email }) => {
    set({ loading: true, error: null });
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${getEnvUrl()}?settings=true`,
    });

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    set({ mailSent: true, loading: false });
  },
  updatePassword: async ({ password }) => {
    set({ loading: true, error: null, mailSent: false });
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    set({ loading: false });
  },
}));
