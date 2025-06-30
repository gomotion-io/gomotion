import React from "react";
import { PlanItem } from "@/components/plan-item";
import { getProducts } from "@/supabase/server-functions/products";
import { getProfile } from "@/supabase/server-functions/profile";
import { getUser } from "@/supabase/server-functions/users";

const Pricing = async () => {
  const user = await getUser();
  let profile = null;
  if (user) {
    profile = await getProfile(user.id);
  }
  const products = await getProducts();

  const order = ["Free", "Standard", "Pro", "Enterprise"];
  const sortedProducts = products.sort(
    (a, b) => order.indexOf(a.name) - order.indexOf(b.name),
  );

  return (
    <div className="mx-auto px-2">
      <div className="mx-auto max-w-lg sm:max-w-3xl space-y-4 pt-6 pb-3 text-center flex flex-col items-center">
        <h4 className="mx-auto mb-2 text-balance text-[42px] font-semibold text-stone-100">
          Pricing
        </h4>
        <p className="text-center max-w-lg text-lg leading-8 text-muted-foreground mb-7">
          Choose the perfect plan for your video creation needs. Start building
          amazing content today with our flexible pricing options.
        </p>

        <div className="text-sm font-medium text-emerald-400">
          The future of motion design today
        </div>
      </div>

      <div className="mx-auto max-w-6xl grid gap-6 px-4 sm:px-10 py-8 lg:grid-cols-4 mb-10">
        {sortedProducts.map((product, index) => (
          <PlanItem key={index} product={product} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
