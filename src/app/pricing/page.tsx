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
    (a, b) => order.indexOf(a.name) - order.indexOf(b.name)
  );

  return (
    <div className="mx-auto flex flex-col gap-5 justify-center items-center px-2 pt-[5rem] min-h-screen">
      <h2 className="text-5xl mt-10 font-neue-montreal text-center font-bold max-w-3xl leading-[1.2em]">
        Pricing
      </h2>
      <h3 className="text-xl text-muted-foreground text-center max-w-3xl leading-relaxed">
        Use Gomotion for free with your entire team and upgrade to export your
        files in 4k, remove the watermark, create unlimited video and more.
      </h3>

      <div className="mx-auto lg:max-w-[85rem] flex-wrap flex md:flex-row flex-col items-center justify-center gap-6 px-5 py-8">
        {sortedProducts.map((product, index) => (
          <PlanItem key={index} product={product} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
