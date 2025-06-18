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
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PricingOption = {
  name: string;
  price: string;
  yearlyPrice: string;
  description: string;
  features: string[];
  link: string;
  highlight?: boolean;
  type: "free" | "paid" | "contactUs";
};

const pricingOptions: PricingOption[] = [
  {
    name: "Free",
    price: "$0",
    yearlyPrice: "",
    description:
      "For individuals looking to explore Gomotion features for content creation.",
    features: [
      "4 videos each month",
      "Up to 1080p export",
      "Watermark",
      "",
      "",
    ],
    link: "/sign-in",
    type: "free",
  },
  {
    name: "Standard",
    price: "$9.99",
    yearlyPrice: "",
    description:
      "Ideal for solo creators looking to elevate their content with powerful motion animation.",
    features: [
      "15 videos each month",
      "Up to 4K export",
      "No watermark",
      "Priority support",
      "",
    ],
    link: "https://gomotion.lemonsqueezy.com/buy/701dc055-0332-4d51-90ee-69ab0ecc3f49",
    highlight: true,
    type: "paid",
  },
  {
    name: "Pro",
    price: "$24.99",
    yearlyPrice: "$949",
    description:
      "For individuals or teams who create content without compromise.",
    features: [
      "35 videos each month",
      "Up to 4K export",
      "No watermark",
      "Priority support",
      "",
    ],
    link: "https://gomotion.lemonsqueezy.com/buy/cc167374-073b-451d-a3b8-2e80340226b0",
    type: "paid",
  },
  {
    name: "Enterprise",
    price: "Custom",
    yearlyPrice: "Custom",
    description: "For enterprises with unlimited videos and custom solutions.",
    features: [
      "Unlimited videos",
      "Brand kit",
      "SSO & SAML",
      "SLA & uptime guarantees",
      "Bespoke integrations",
    ],
    link: "https://discord.gg/emD6h74Fh7",
    type: "contactUs",
  },
];

const Pricing = () => {
  const [isYearly] = useState(false);

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
            3 day free trial on all plans
          </div>
        </div>

        <div className="mx-auto max-w-6xl grid gap-6 px-4 sm:px-10 py-8 lg:grid-cols-4 mb-10">
          {pricingOptions.map((option, index) => (
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
                  {isYearly ? option.yearlyPrice : option.price}
                  {option.name == "Enterprise" ? (
                    ""
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">
                      {isYearly ? " /year" : " /month"}
                    </span>
                  )}
                </div>
                <ul className="mt-4 space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature !== "" && (
                        <Check className="mr-2 h-4 w-4 text-emerald-400" />
                      )}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link
                  href={option.link}
                  target={option.type === "free" ? "" : "_blank"}
                  className="w-full"
                >
                  <Button className="w-full">
                    {option.type === "free"
                      ? "Start for free"
                      : option.type === "paid"
                        ? "Subscribe now"
                        : "Contact us"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
