"use client";

import { ExternalLink, Key, Copy, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HowToPage() {
  return (
    <div className="max-w-[85rem] mx-auto pt-5 px-5 lg:px-44">
      {/* Badge & Hero */}
      <section className="reveal flex flex-col gap-8 pt-40 max-w-3xl">
        <span className="self-start text-emerald-900 bg-emerald-100 px-5 h-10 rounded-full flex items-center justify-center text-sm font-medium tracking-wider uppercase">
          Setup Guide
        </span>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-neue-montreal font-bold leading-[1.1em]">
          How to Get Your OpenRouter API&nbsp;Key
        </h1>

        <p className="text-2xl leading-relaxed text-muted-foreground">
          Gomotion uses OpenRouter to access powerful AI models. Follow this
          simple guide to create your API key and start generating amazing
          motion graphics in minutes.
        </p>

        <div className="flex items-center gap-3 text-lg">
          <span className="text-muted-foreground">Time required:</span>
          <span className="font-semibold text-emerald-700">~2 minutes</span>
        </div>
      </section>

      {/* Step 1 */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold text-xl">
            1
          </div>
          <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
            Go to OpenRouter
          </h2>
        </div>

        <p className="text-xl leading-relaxed">
          Visit{" "}
          <a
            href="https://openrouter.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4 inline-flex items-center gap-1"
          >
            openrouter.ai
            <ExternalLink className="w-4 h-4" />
          </a>{" "}
          and click on the <strong>&quot;Sign In&quot;</strong> button in the top right
          corner.
        </p>

        {/* Placeholder for screenshot */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl border-2 border-dashed border-neutral-300 flex items-center justify-center overflow-hidden">
          <div className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-300 flex items-center justify-center">
              <Image
                src="/images/placeholder-screenshot.png"
                alt="OpenRouter homepage"
                width={800}
                height={450}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <p className="text-neutral-500 text-lg font-medium">
              Screenshot: OpenRouter Homepage
            </p>
            <p className="text-neutral-400 text-sm mt-2">
              Replace with actual screenshot of openrouter.ai homepage
            </p>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold text-xl">
            2
          </div>
          <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
            Create Your Account
          </h2>
        </div>

        <p className="text-xl leading-relaxed">
          Sign up using your preferred method. You can use:
        </p>

        <ul className="list-none space-y-3 text-xl">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
            <span>Google account</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
            <span>GitHub account</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
            <span>Email and password</span>
          </li>
        </ul>

        {/* Placeholder for screenshot */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl border-2 border-dashed border-neutral-300 flex items-center justify-center overflow-hidden">
          <div className="text-center p-8">
            <p className="text-neutral-500 text-lg font-medium">
              Screenshot: Sign Up Options
            </p>
            <p className="text-neutral-400 text-sm mt-2">
              Replace with actual screenshot of the sign up page
            </p>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold text-xl">
            3
          </div>
          <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
            Navigate to API Keys
          </h2>
        </div>

        <p className="text-xl leading-relaxed">
          Once logged in, click on your profile icon in the top right corner,
          then select <strong>&quot;Keys&quot;</strong> from the dropdown menu. Or go
          directly to{" "}
          <a
            href="https://openrouter.ai/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4 inline-flex items-center gap-1"
          >
            openrouter.ai/keys
            <ExternalLink className="w-4 h-4" />
          </a>
        </p>

        {/* Placeholder for screenshot */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl border-2 border-dashed border-neutral-300 flex items-center justify-center overflow-hidden">
          <div className="text-center p-8">
            <p className="text-neutral-500 text-lg font-medium">
              Screenshot: Profile Menu with Keys Option
            </p>
            <p className="text-neutral-400 text-sm mt-2">
              Replace with actual screenshot showing the navigation to Keys
            </p>
          </div>
        </div>
      </section>

      {/* Step 4 */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold text-xl">
            4
          </div>
          <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
            Create a New API Key
          </h2>
        </div>

        <p className="text-xl leading-relaxed">
          Click on the <strong>&quot;Create Key&quot;</strong> button. You can give your
          key a name like <em>&quot;Gomotion&quot;</em> to easily identify it later.
        </p>

        {/* Placeholder for screenshot */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl border-2 border-dashed border-neutral-300 flex items-center justify-center overflow-hidden">
          <div className="text-center p-8">
            <p className="text-neutral-500 text-lg font-medium">
              Screenshot: Create Key Button
            </p>
            <p className="text-neutral-400 text-sm mt-2">
              Replace with actual screenshot of the Keys page with Create button
            </p>
          </div>
        </div>
      </section>

      {/* Step 5 */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold text-xl">
            5
          </div>
          <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
            Copy Your API Key
          </h2>
        </div>

        <p className="text-xl leading-relaxed">
          Your new API key will be displayed. <strong>Important:</strong> Copy it
          immediately and store it somewhere safe. You won&apos;t be able to see
          the full key again after leaving this page.
        </p>

        {/* Visual representation of an API key */}
        <div className="bg-neutral-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-emerald-400" />
              <code className="text-neutral-300">
                sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </code>
            </div>
            <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-neutral-800">
              <Copy className="w-4 h-4" />
              <span className="text-xs">Copy</span>
            </button>
          </div>
        </div>

        {/* Placeholder for screenshot */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl border-2 border-dashed border-neutral-300 flex items-center justify-center overflow-hidden">
          <div className="text-center p-8">
            <p className="text-neutral-500 text-lg font-medium">
              Screenshot: Copy API Key Modal
            </p>
            <p className="text-neutral-400 text-sm mt-2">
              Replace with actual screenshot showing the generated API key
            </p>
          </div>
        </div>
      </section>

      {/* Step 6 */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold text-xl">
            6
          </div>
          <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
            Add Credits (Optional)
          </h2>
        </div>

        <p className="text-xl leading-relaxed">
          OpenRouter offers some free credits to get started, but for extended
          use, you may want to add credits to your account. Navigate to{" "}
          <a
            href="https://openrouter.ai/credits"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4 inline-flex items-center gap-1"
          >
            openrouter.ai/credits
            <ExternalLink className="w-4 h-4" />
          </a>{" "}
          to manage your balance.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="text-amber-800 text-lg">
            <strong>Tip:</strong> Start with a small amount like $5-10 to test
            things out. OpenRouter charges per token used, so you only pay for
            what you use.
          </p>
        </div>

        {/* Placeholder for screenshot */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl border-2 border-dashed border-neutral-300 flex items-center justify-center overflow-hidden">
          <div className="text-center p-8">
            <p className="text-neutral-500 text-lg font-medium">
              Screenshot: Credits Page
            </p>
            <p className="text-neutral-400 text-sm mt-2">
              Replace with actual screenshot of the credits/billing page
            </p>
          </div>
        </div>
      </section>

      {/* Step 7 - Use in Gomotion */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xl">
            7
          </div>
          <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
            Use Your Key in Gomotion
          </h2>
        </div>

        <p className="text-xl leading-relaxed">
          Head over to Gomotion, go to your <strong>Settings</strong>, and paste
          your OpenRouter API key in the designated field. That&apos;s it!
          You&apos;re ready to create amazing motion graphics.
        </p>

        {/* Placeholder for screenshot */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl border-2 border-dashed border-neutral-300 flex items-center justify-center overflow-hidden">
          <div className="text-center p-8">
            <p className="text-neutral-500 text-lg font-medium">
              Screenshot: Gomotion Settings Page
            </p>
            <p className="text-neutral-400 text-sm mt-2">
              Replace with actual screenshot of where to paste the API key in
              Gomotion
            </p>
          </div>
        </div>
      </section>

      {/* Success / CTA */}
      <section className="reveal flex flex-col gap-8 pt-24 pb-32 max-w-3xl">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 sm:p-12 border border-emerald-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-neue-montreal font-bold text-emerald-900">
              You&apos;re All Set!
            </h2>
          </div>

          <p className="text-xl leading-relaxed text-emerald-800 mb-8">
            Your OpenRouter API key is now connected to Gomotion. Start creating
            stunning motion graphics with the power of AI. Just type a prompt
            and watch the magic happen.
          </p>

          <Link href="/explore">
            <button className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-semibold text-lg px-8 py-4 rounded-full inline-flex items-center gap-2">
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* FAQ or Troubleshooting */}
        <div className="space-y-6 pt-8">
          <h3 className="text-2xl font-neue-montreal font-bold">
            Need Help?
          </h3>

          <div className="space-y-4">
            <details className="group bg-neutral-50 rounded-xl">
              <summary className="cursor-pointer p-6 text-lg font-semibold flex items-center justify-between">
                My API key isn&apos;t working
                <span className="text-neutral-400 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-neutral-600">
                Make sure you copied the entire key without any extra spaces.
                Also verify that your OpenRouter account has sufficient credits.
              </div>
            </details>

            <details className="group bg-neutral-50 rounded-xl">
              <summary className="cursor-pointer p-6 text-lg font-semibold flex items-center justify-between">
                How much does OpenRouter cost?
                <span className="text-neutral-400 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-neutral-600">
                OpenRouter uses a pay-per-use model. You only pay for the tokens
                you consume. Check their pricing page for current rates on
                different models.
              </div>
            </details>

            <details className="group bg-neutral-50 rounded-xl">
              <summary className="cursor-pointer p-6 text-lg font-semibold flex items-center justify-between">
                Can I use my own API key from other providers?
                <span className="text-neutral-400 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-neutral-600">
                Currently, Gomotion works with OpenRouter API keys. OpenRouter
                provides access to multiple AI models through a single API,
                making it the most flexible option.
              </div>
            </details>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-muted-foreground">
            Still stuck? Join our{" "}
            <a
              href="https://discord.gg/Wd4nCJhCgd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4"
            >
              Discord community
            </a>{" "}
            for help.
          </p>
        </div>
      </section>
    </div>
  );
}
