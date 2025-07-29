"use client";

import React, { FC } from "react";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn, formatCredits } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { CREDIT_FACTOR } from "@/constant";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { ProfileData } from "@/_type";
import { useCheckoutStore } from "@/store/checkout.store";

type PlanItemProps = {
  product: Product;
  profile: ProfileData | null;
};

export const PlanItem: FC<PlanItemProps> = ({ profile, product }) => {
  const loading = useCheckoutStore((state) => state.loading);
  const currentVariantId = useCheckoutStore((state) => state.variantId);
  const checkout = useCheckoutStore((state) => state.checkout);

  return (
    <Card
      className={clsx(
        "flex flex-col rounded-3xl shadow-none bg-white w-64",
        product.highlight && "border-neutral-200 scale-110 my-4 sm:my-0",
      )}
    >
      <CardHeader>
        <div className="text-xl font-semibold">{product.name}</div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-3xl font-bold">
          {product.name == "Enterprise" ? (
            "Custom"
          ) : (
            <div>
              ${product.price}
              <span className="text-sm font-medium text-muted-foreground">
                /month
              </span>
            </div>
          )}
        </div>
        <ul className="mt-4 space-y-2">
          {product.name !== "Enterprise" && (
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              <span className={product.highlight ? "text-lg" : "text-lg"}>
                {formatCredits(product.limit * CREDIT_FACTOR)} per month
              </span>
            </li>
          )}

          {((product.features as []) || [])?.map((feature, index) => (
            <li key={index} className="flex items-center">
              {feature && <Check className="mr-2 h-4 w-4" />}
              <span className={product.highlight ? "text-lg" : "text-lg"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        {profile?.products?.variant_id &&
        profile.products.variant_id === product.variant_id ? (
          <Button
            className="w-full gap-2 flex items-center"
            variant="outline"
            disabled
          >
            Current Plan
          </Button>
        ) : (
          <Button
            className={cn(
              "w-full gap-2 flex items-center rounded-full h-12 bg-stone-100 text-black",
              product.highlight &&
                "text-emerald-900 bg-emerald-100 hover:bg-emerald-200",
            )}
            variant="ghost"
            disabled={loading}
            onClick={() => checkout(product, profile)}
          >
            {product.name === "Free"
              ? "Start for free"
              : product.name === "Enterprise"
                ? "Contact us"
                : "Subscribe"}

            {currentVariantId === product.variant_id && (
              <Spinner className="text-stone-950" />
            )}

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
