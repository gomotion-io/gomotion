import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const Further = () => {
  return (
    <section className="w-full h-full sm:py-16 block-layout" id="works">
      <div className="flex gap-8">
        <div className="hidden sm:block sm:flex-1" />
        <div className="flex-1">
          <div className="w-full sm:w-[70%] space-y-8 sm:space-y-16">
          <h2 className="text-4xl sm:text-6xl font-neue-montreal font-semibold">
            Make Something Incredible Today.
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            You’ve seen what’s possible—now it’s your turn. Go from idea to motion in minutes with the power of prompt-based animation. No tools. No barriers. Just creativity in motion.
          </p>
          <Link href="/explore">
            <Button size="sm">
              Create animation <ArrowRight />{" "}
            </Button>
          </Link>

            
          </div>
        </div>
      </div>
    </section>
  );
};
