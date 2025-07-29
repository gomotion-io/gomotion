"use client";

import Image from "next/image";

export default function StoryPage() {
  return (
    <div className="max-w-7xl mx-auto border-x border-dashed pt-5 px-5 lg:px-12">
      {/* Badge & Hero */}
      <section className="reveal flex flex-col gap-8 pt-40 max-w-3xl">
        <span className="self-start text-fuchsia-900 bg-fuchsia-100 px-5 h-10 rounded-full flex items-center justify-center text-sm font-medium tracking-wider uppercase">
          Our Story
        </span>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-neue-montreal font-bold leading-[1.2em]">
          We are building what After&nbsp;Effects should have been
        </h1>

        <p className="text-2xl leading-relaxed text-muted-foreground">
          Gomotion was born from our frustration with how hard it is to bring
          ideas to life through animation. Traditional tools like After Effects
          take months to master, and every video can swallow days—sometimes
          weeks—of production time. We want to make it possible to craft motion
          animations in minutes and give everyone the power to express ideas
          with no technical barriers, just creativity.
        </p>

        <div className="flex gap-5">
          <div className="rounded-md w-32 h-44 overflow-hidden">
            <Image
              width={1080}
              height={720}
              alt="gomotion"
              className="object-cover w-full h-full align-middle"
              src="/images/team-philippe.jpg"
            />{" "}
          </div>
          <div className="rounded-md rounded w-32 h-44 overflow-hidden">
            <Image
              width={1080}
              height={720}
              alt="gomotion"
              className="object-cover w-full h-full align-middle"
              src="/images/team-lionel.jpg"
            />
          </div>
        </div>

        <p className="text-xl leading-relaxed font-semibold">
          — Lionel &amp; Philippe
          <br />
          Co-founders, former timeline hostages, still pressing
          &quot;publish&quot;
        </p>

        {/* call-to-action */}
        <div className="pt-8">
          <a href="/sign-in">
            <button className="text-emerald-900 hover:bg-emerald-200 transition-colors duration-300 bg-emerald-100 font-medium text-lg w-full sm:w-60 lg:w-80 h-14 sm:h-16 rounded-full">
              Get started
            </button>
          </a>
        </div>
      </section>

      {/* Pain Point */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl md:pl-24">
        <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
          We&apos;re Tired of Great Ideas Dying in After&nbsp;Effects
        </h2>

        <p className="text-xl leading-relaxed">
          I&apos;m sitting here at 2&nbsp;AM, staring at a timeline that should
          have taken 20&nbsp;minutes but has eaten my entire weekend.
        </p>

        <p className="text-xl leading-relaxed">
          My co-founder just messaged me:&nbsp;
          <em>
            &quot;Started another After Effects project. Please help.&quot;
          </em>
        </p>

        <p className="text-xl leading-relaxed">
          Here&apos;s the thing: I have a Master&apos;s in Data&nbsp;Science and
          1,380 YouTube subscribers who trust me to explain complex AI concepts.
          My co-founder is a senior frontend engineer who&apos;s shipped amazing
          products for more companies than we can count. We&apos;re not dumb.
        </p>

        <p className="text-xl leading-relaxed font-semibold">
          But when it comes to turning our ideas into motion? We&apos;re
          hostages.
        </p>
      </section>

      {/* Breaking Point */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl md:pl-24">
        <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
          The Breaking Point
        </h2>

        <div className="space-y-5 text-xl leading-relaxed">
          <p>
            <strong>Me:</strong> I&apos;ve got this brilliant way to visualize
            how neural networks learn. It&apos;s crystal clear in my head.
            Should take 5&nbsp;seconds of animation.
          </p>
          <p>
            <strong>Reality:</strong> 47&nbsp;hours later, I&apos;m googling
            &quot;how to make text follow bezier curve&quot; for the thousandth
            time, my idea is half-dead, and I&apos;m questioning my life
            choices. The timeline? Never finished.
          </p>
          <p>
            <strong>My co-founder:</strong> I need a simple product demo. Clean,
            professional, 30&nbsp;seconds max.
          </p>
          <p>
            <strong>Reality:</strong> Three abandoned After Effects projects
            later, we&apos;re still explaining our product with static
            screenshots and hand gestures.
          </p>
        </div>

        <p className="text-xl leading-relaxed font-semibold">
          &ldquo;Why is explaining an idea pure joy, but showing the idea pure
          torture?&rdquo;
        </p>
      </section>

      {/* What We&#39;re Building */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl md:pl-24">
        <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
          What We&apos;re Actually Building
        </h2>

        <p className="text-xl leading-relaxed">
          Forget everything you know about motion graphics. We&apos;re{" "}
          <em>not</em>
          building another After Effects, and we&apos;re <em>not</em> adding
          more buttons to Figma. We&apos;re replacing the entire timeline with a
          single prompt.
        </p>

        {/* prompt demo */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-fuchsia-900 font-semibold">You:</span>
            <span className="bg-fuchsia-100 text-fuchsia-900 px-4 py-2 rounded-2xl max-w-md">
              Make my logo bounce in like it&apos;s excited to be here
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-emerald-900 font-semibold">Gomotion:</span>
            <span className="bg-emerald-100 text-emerald-900 px-4 py-2 rounded-2xl max-w-md italic">
              handling the keyframes, easing curves, and color theory…
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-900 font-semibold">You:</span>
            <span className="bg-amber-100 text-amber-900 px-4 py-2 rounded-2xl max-w-md italic">
              receives a shareable video in 45&nbsp;seconds
            </span>
          </div>
        </div>
      </section>

      {/* Personal */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl md:pl-24">
        <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
          This Is Personal
        </h2>

        <p className="text-xl leading-relaxed">
          Every creator has that folder. You know the one.{" "}
          <em>&quot;Video Ideas&quot;</em>
          with 47 half-finished concepts that died because animation was too
          hard.
        </p>
        <p className="text-xl leading-relaxed">
          Every entrepreneur has that moment when you realize a simple demo
          video would explain everything, but the learning curve feels steeper
          than your startup journey.
        </p>
        <p className="text-xl leading-relaxed">
          Every educator has that frustration when the perfect explanation is
          right there in your head, but getting it out requires learning
          software that feels like rocket science.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-xl leading-relaxed">
          <li>
            Your creativity shouldn&apos;t be held hostage by software
            complexity
          </li>
          <li>
            Ideas have expiration dates—tools shouldn&apos;t be slower than
            inspiration
          </li>
          <li>
            The best motion graphics tool is the one that disappears while you
            create
          </li>
        </ul>
      </section>

      {/* Where We&#39;re Going */}
      <section className="reveal flex flex-col gap-6 pt-24 max-w-3xl md:pl-24 pb-32">
        <h2 className="text-3xl sm:text-4xl font-neue-montreal font-bold leading-[1.3em]">
          Where We&apos;re Going
        </h2>

        <p className="text-xl leading-relaxed">
          We&apos;re a few months deep, shipping every Friday night with pizza
          boxes and energy drinks scattered across our desks. Our north star is
          simple: let anyone on Earth turn words into moving pictures before
          their coffee gets cold.
        </p>

        <p className="text-xl leading-relaxed">
          If you&apos;ve ever had a brilliant idea die in a timeline... If
          you&apos;ve ever started an After Effects project and never finished
          it... If you&apos;ve ever chosen <strong>not</strong> to share
          something because making it move felt impossible...{" "}
          <strong>This is for you.</strong>
        </p>

        <p className="text-xl leading-relaxed font-semibold">
          — Lionel &amp; Philippe
          <br />
          Co-founders, former timeline hostages, still pressing
          &quot;publish&quot;
        </p>

        <p className="text-sm text-muted-foreground pt-4">
          P.S. Yes, we&apos;re still learning After Effects. No, we&apos;re not
          getting better at it.
        </p>
      </section>
    </div>
  );
}
