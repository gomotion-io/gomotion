import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEnvUrl = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.startsWith("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};

export const formatCredits = (credits: number): string => {
  if (credits < 1000) return `${credits} credits`;

  const valueInThousands = credits / 1000;
  // Keep one decimal place but trim trailing ".0" when not needed
  const formatted = Number(valueInThousands.toFixed(1)).toString();
  return `${formatted}k credits`;
};
