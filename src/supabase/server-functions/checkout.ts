"use server";

import axios from "axios";
import { createClient } from "@/supabase/server";

const apiKey = process.env.LEMONSQUEEZY_API_KEY;
const storeId = process.env.LEMONSQUEEZY_STORE_ID;

export const checkout = async ({
  variantId,
}: {
  variantId: string;
}): Promise<{
  error: string | null;
  checkoutUrl: string | null;
}> => {
  const supabase = await createClient();
  const response = await supabase.auth.getUser();
  const user = response.data.user;

  if (!user) {
    return {
      error: "User not found",
      checkoutUrl: null,
    };
  }

  try {
    const checkout = await axios.post(
      "https://api.lemonsqueezy.com/v1/checkouts",
      {
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email: user.email,
              custom: {
                user_id: user.id,
                product_id: variantId,
              },
            },
          },
          relationships: {
            store: {
              data: { type: "stores", id: storeId },
            },
            variant: {
              data: { type: "variants", id: variantId },
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    return {
      error: null,
      checkoutUrl: checkout.data.data.attributes.url,
    };
  } catch (err) {
    return {
      error: (err as Error).message,
      checkoutUrl: null,
    };
  }
};
