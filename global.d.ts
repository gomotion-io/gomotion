import { Database as Db } from "@/supabase/generated/database.types";

declare global {
  type Database = Db;
  type Profile = Database["public"]["Tables"]["profiles"]["Row"];
  type Product = Database["public"]["Tables"]["products"]["Row"];
  type Count = Database["public"]["Tables"]["counts"]["Row"];
  type Video = Database["public"]["Tables"]["videos"]["Row"];
}
