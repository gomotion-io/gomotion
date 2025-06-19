"use server";

import { createClient } from "@/supabase/server";
import axios from "axios";

export type LemonsqueezySubscription = {
  customer_id: string;
  user_name: string;
  user_email: string;
  status_formatted: string;
  product_name: string;
  status: string;
  first_subscription_item: {
    id: number;
  };
  urls: {
    update_payment_method: string;
    customer_portal: string;
    customer_portal_update_subscription: string;
  };
  renews_at: string;
  ends_at: string;
  created_at: string;
  updated_at: string;
};

export const subscriptions = async ({
  userId,
}: {
  userId?: string;
}): Promise<LemonsqueezySubscription | null> => {
  const supabase = await createClient();

  if (!userId) {
    return null;
  }

  const data = await supabase.from("profiles").select("*").eq("id", userId);
  const subscriptionId = data?.data?.[0]?.subscription_id;

  if (!subscriptionId) {
    return null;
  }

  try {
    const subscriptionData = await axios.get(
      `https://api.lemonsqueezy.com/v1/subscriptions/${subscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        },
      },
    );

    return subscriptionData?.data?.data?.attributes || null;
  } catch {
    return null;
  }
};
