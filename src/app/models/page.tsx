import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gomotion Models – G-0 (gomotion-zero)",
  description:
    "Technical documentation and overview of Gomotion's first generative video model, G-0 (gomotion-zero). Learn about its architecture, capabilities, limitations and how to get started.",
};

const capabilityList = [
  {
    title: "Multimodal Prompting",
    description:
      "Accepts text, image and audio inputs to better understand creative context and deliver on-brand motion design.",
  },
  {
    title: "60-Second Render Time",
    description:
      "Generates 1080×1920 videos in roughly a minute thanks to a highly-optimized diffusion pipeline running on GPU clusters.",
  },
  {
    title: "Voice-over & Music",
    description:
      "Seamlessly stitches AI-generated voice narration and royalty-free background music into the final render.",
  },
  {
    title: "Fine-tune Ready",
    description:
      "Bring your brand assets and style frames – G-0 can be fine-tuned on as few as 20 videos to match your unique look & feel.",
  },
];

export default function ModelsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[5rem] pb-24 text-stone-100">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-[42px] font-semibold leading-tight mb-4">
          Gomotion Models
        </h1>
        <p className="max-w-xl mx-auto text-lg text-muted-foreground">
          Cutting-edge generative motion design models that help you create
          scroll-stopping videos in seconds.
        </p>
      </section>

      {/* G-0 Overview */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-2 flex items-center gap-2">
          <span>G-0</span>
          <span className="text-base font-normal text-muted-foreground">
            (gomotion-zero)
          </span>
        </h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
          G-0 is our first-generation, diffusion-based video model trained on
          over 5 million motion-graphic shots. It specialises in kinetic
          typography, seamless transitions and bold colour palettes – perfect
          for social media content, ads and explainer videos.
        </p>

        <div className="w-full aspect-video relative rounded-xl overflow-hidden mb-10 ring-[1px] ring-stone-700/50">
          <Image
            src="/images/gomotion.png"
            alt="G-0 sample frame"
            fill
            className="object-cover"
          />
        </div>

        {/* Capabilities */}
        <h3 className="text-2xl font-semibold mb-4">Key capabilities</h3>
        <ul className="grid md:grid-cols-2 gap-6 mb-10">
          {capabilityList.map((item) => (
            <li
              key={item.title}
              className="p-5 rounded-lg border border-stone-700/40 bg-stone-900/40 backdrop-blur"
            >
              <h4 className="font-medium mb-1">{item.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        {/* Architecture diagram */}
        <h3 className="text-2xl font-semibold mb-4">Architecture</h3>
        <div className="w-full relative aspect-[16/9] rounded-xl overflow-hidden ring-[1px] ring-stone-700/50">
          <Image
            src="/architecture.svg"
            alt="Model architecture"
            fill
            className="object-contain p-6"
          />
        </div>
      </section>

      {/* Getting started */}
      <section>
        <h3 className="text-2xl font-semibold mb-3">Getting started</h3>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground max-w-2xl">
          <li>
            Create a{" "}
            <span className="text-primary font-medium">free account</span> and
            pick a plan that fits your rendering needs.
          </li>
          <li>
            Head to our{" "}
            <span className="text-primary font-medium">Explore</span> section to
            play with prompt examples or start from scratch.
          </li>
          <li>
            Adjust aspect ratio, voice & music options, then hit{" "}
            <span className="text-primary font-medium">Render</span>.
          </li>
          <li>
            Download your video or share it directly to TikTok, Instagram Reels
            or YouTube Shorts.
          </li>
        </ol>
      </section>
    </div>
  );
}
