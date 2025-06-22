import { ProfileData } from "@/_type";
import { checkout } from "@/supabase/server-functions/checkout";
import { create } from "zustand/index";

export type CheckoutState = {
  loading: boolean;
  variantId: string;
  setIsLoading: (loading: boolean) => void;
  setVariantId: (variantId: string) => void;
  checkout: (product: Product, profile: ProfileData | null) => Promise<void>;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  loading: false,
  variantId: "idle",
  setIsLoading: (loading) => set({ loading }),
  setVariantId: (variantId) => set({ variantId }),
  checkout: async (product, profile) => {
    if (product.name === "Free") {
      window.location.href = "/sign-in";
      return;
    }

    if (product.name === "Enterprise") {
      window.location.href = "https://discord.gg/emD6h74Fh7";
      return;
    }

    if (!profile?.id) {
      window.location.href = "/sign-in";
      return;
    }

    if (!product?.variant_id) return;

    set({ loading: true });
    set({ variantId: product.variant_id });
    const data = await checkout({ variantId: product.variant_id });
    set({ loading: false });
    if (data.checkoutUrl) {
      window.open(data.checkoutUrl, "_blank");
    }
  },
}));
