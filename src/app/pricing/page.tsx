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

const pricingOptions = [
  {
    name: "Starter",
    price: "$39",
    yearlyPrice: "$279",
    description:
      "Ideal for solo creators & small teams building social blitzes.",
    features: [
      "60 videos each month",
      "Up to 1080p export",
      "No watermark",
      "",
      "",
    ],
    link: "https://tubeminds.lemonsqueezy.com/buy/cc167374-073b-451d-a3b8-2e80340226b0",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$189",
    yearlyPrice: "$949",
    description: "Scale your content calendar with no compromises.",
    features: [
      "280 videos each month",
      "Up to 4K export",
      "No watermark",
      "Priority support",
      "",
    ],
    link: "https://tubeminds.lemonsqueezy.com/buy/701dc055-0332-4d51-90ee-69ab0ecc3f49",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    yearlyPrice: "Custom",
    description: "Limitless videos, dedicated support, and custom solutions.",
    features: [
      "Unlimited videos",
      "Brand kit",
      "SSO & SAML",
      "SLA & uptime guarantees",
      "Bespoke integrations",
    ],
    link: "gomotion",
    highlight: false,
  },
];

const Pricing = () => {
  const [isYearly] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto px-2">
        <div className="mx-auto max-w-lg sm:max-w-3xl space-y-4 pt-6 pb-3 text-center flex flex-col items-center">
          <h4 className="mx-auto mb-2 text-balance text-[42px] font-medium">
            Pricing
          </h4>
          <p className="text-center max-w-lg text-lg leading-8 text-muted-foreground mb-7">
            Choose the perfect plan for your video creation needs. Start
            building amazing content today with our flexible pricing options.
          </p>

          <div className="text-sm  font-medium text-emerald-400">
            3 day free trial on all plans
          </div>
        </div>

        <div className="mx-auto max-w-5xl grid gap-6 px-4 sm:px-10 py-8 lg:grid-cols-3">
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
                <p className="text-muted-foreground">{option.description}</p>
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
                <Link href={option.link} target="_blank" className="w-full">
                  <Button className="w-full">
                    {option.link === "gomotion"
                      ? "Contact us"
                      : "Start with free trial"}
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
