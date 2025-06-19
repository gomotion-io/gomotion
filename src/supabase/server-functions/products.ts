"use server";

import { createAdminClient } from "@/supabase/admin";

export const linkProductToUser = async (
  userId: string,
  variantId: string,
  subscriptionId: string | null = null,
): Promise<void> => {
  const supabase = await createAdminClient();

  const { error: productError, data } = await supabase
    .from("products")
    .select("id")
    .eq("variant_id", variantId)
    .single();

  if (productError) {
    throw new Error("Failed to fetch product data");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      subscription_status: variantId === "free" ? "inactive" : "active",
      subscription_id: subscriptionId,
      product_id: data.id,
    })
    .eq("id", userId);

  if (error) {
    throw new Error("Failed to update user subscription data");
  }
};
