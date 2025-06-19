"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { ArrowRight, Check } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { checkout } from "@/supabase/server-functions/checkout";
import { Spinner } from "@/components/spinner";
import { getUser } from "@/supabase/client-functions/user";
import { getProducts } from "@/supabase/server-functions/products";
import { CREDIT_FACTOR } from "@/constant";
import { ProfileData } from "@/_type";
import { getProfile } from "@/supabase/server-functions/profile";

const Pricing = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [loadingCheckout, setIsLoadingCheckout] = useState(false);
  const [currentVariantId, setCurrentVariantId] = useState<string>("idle");

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (user) {
        const profileData = await getProfile(user.id);
        setProfile(profileData);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const products = await getProducts();
        const order = ["Free", "Standard", "Pro", "Enterprise"];
        const sortedProducts = products.sort(
          (a, b) => order.indexOf(a.name) - order.indexOf(b.name),
        );
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error while getting products", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onCheckout = useCallback(
    async (product: Product) => {
      const user = await getUser();

      if (product.name === "Free") {
        router.push("/sign-in");
        return;
      }

      if (product.name === "Enterprise") {
        window.location.href = "https://discord.gg/emD6h74Fh7";
        return;
      }

      if (!user) {
        router.push("/sign-in");
        return;
      }

      if (!product?.variant_id) return;
      setCurrentVariantId(product.variant_id);
      setIsLoadingCheckout(true);
      const data = await checkout({ variantId: product.variant_id });
      if (data.checkoutUrl) {
        window.open(data.checkoutUrl, "_blank");
      }
      setIsLoadingCheckout(false);
      setCurrentVariantId("idle");
    },
    [router],
  );

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto px-2">
        <div className="mx-auto max-w-lg sm:max-w-3xl space-y-4 pt-6 pb-3 text-center flex flex-col items-center">
          <h4 className="mx-auto mb-2 text-balance text-[42px] font-semibold">
            Pricing
          </h4>
          <p className="text-center max-w-lg text-lg leading-8 text-muted-foreground mb-7">
            Choose the perfect plan for your video creation needs. Start
            building amazing content today with our flexible pricing options.
          </p>

          <div className="text-sm font-medium text-emerald-400">
            The future of motion design today
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 w-full justify-center h-40">
            <Spinner className="text-stone-100" />
          </div>
        ) : (
          <div className="mx-auto max-w-6xl grid gap-6 px-4 sm:px-10 py-8 lg:grid-cols-4 mb-10">
            {products.map((option, index) => (
              <Card
                key={index}
                className={clsx(
                  "flex flex-col shadow-none bg-opacity-10",
                  option.highlight && "border-neutral-200 scale-110",
                )}
              >
                <CardHeader>
                  <CardTitle>{option.name}</CardTitle>
                  <p
                    className={cn(
                      "text-muted-foreground",
                      option.highlight && "text-sm",
                    )}
                  >
                    {option.description}
                  </p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-3xl font-bold">
                    {option.name == "Enterprise" ? (
                      "Custom"
                    ) : (
                      <div>
                        ${option.price}
                        <span className="text-sm font-medium text-muted-foreground">
                          /month
                        </span>
                      </div>
                    )}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {option.name !== "Enterprise" && (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-emerald-400" />
                        <span
                          className={
                            option.highlight ? "text-sm" : "text-[14px]"
                          }
                        >
                          {option.limit * CREDIT_FACTOR} credits per month
                        </span>
                      </li>
                    )}

                    {((option.features as []) || [])?.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        {feature && (
                          <Check className="mr-2 h-4 w-4 text-emerald-400" />
                        )}
                        <span
                          className={
                            option.highlight ? "text-sm" : "text-[14px]"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  {profile?.products.variant_id &&
                  profile.products.variant_id === option.variant_id ? (
                    <Button
                      className="w-full gap-2 flex items-center"
                      variant="outline"
                      disabled
                    >
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full gap-2 flex items-center"
                      disabled={loadingCheckout}
                      onClick={() => onCheckout(option)}
                    >
                      {option.name === "Free"
                        ? "Start for free"
                        : option.name === "Enterprise"
                          ? "Contact us"
                          : "Subscribe now"}

                      {currentVariantId === option.variant_id && (
                        <Spinner className="text-stone-950" />
                      )}

                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
