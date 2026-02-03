import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: "Gomotion",
  description:
    "Create scroll-stopping, motion-designed videos from a single prompt. GoMotion is a cutting-edge AI model that generates professional motion design",
};

export default function Home() {
  return <HomePage />;
}
