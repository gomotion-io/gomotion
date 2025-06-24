"use client";

import React, { FC } from "react";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
        "flex flex-col shadow-none bg-opacity-10",
        product.highlight && "border-neutral-200 scale-110",
      )}
    >
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <p
          className={cn(
            "text-muted-foreground",
            product.highlight && "text-sm",
          )}
        >
          {product.description}
        </p>
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
              <Check className="mr-2 h-4 w-4 text-emerald-400" />
              <span className={product.highlight ? "text-sm" : "text-[14px]"}>
                {product.limit * CREDIT_FACTOR} credits per month
              </span>
            </li>
          )}

          {((product.features as []) || [])?.map((feature, index) => (
            <li key={index} className="flex items-center">
              {feature && <Check className="mr-2 h-4 w-4 text-emerald-400" />}
              <span className={product.highlight ? "text-sm" : "text-[14px]"}>
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
            className="w-full gap-2 flex items-center"
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
