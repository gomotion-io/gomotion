import { createClient } from "@/supabase/client";

export const getProducts = async (): Promise<Product[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*");

  if (error) throw error;
  return data || [];
};
