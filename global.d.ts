import { Database as Db } from "@/supabase/generated/database.types";

declare global {
  type Database = Db;
  type Profile = Database["public"]["Tables"]["profiles"]["Row"];
  type Product = Database["public"]["Tables"]["products"]["Row"];
  type Count = Database["public"]["Tables"]["counts"]["Row"];
  type Video = Database["public"]["Tables"]["videos"]["Row"];

  interface Window {
    React: typeof import("react");
    ReactDOM: typeof import("react-dom");
    Remotion: typeof import("remotion");
    gsap: typeof import("gsap").gsap;
    GSAPPlugins: {
      CustomEase: any;
      DrawSVGPlugin: any;
      MorphSVGPlugin: any;
      Physics2DPlugin: any;
      ScrambleTextPlugin: any;
      SplitText: any;
    };
  }
}

declare module "matter-js";
