"use client";

import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-w-0 h-dvh items-center gap-5">
      <Header />
      <div className="w-full max-w-3xl flex flex-col min-w-0 flex-1 items-center p-5 gap-5">
        basic landing page
      </div>
    </div>
  );
}
