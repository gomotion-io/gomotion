"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="flex flex-col min-w-0 h-dvh items-center gap-5">
      <div className="flex flex-col items-center gap-1 text-center mt-40">
        <h3 className="text-2xl font-bold tracking-tight mb-2">
          Thank you for joining Gomotion !
        </h3>
        <p className="text-muted-foreground">
          We have sent you an email to confirm your account.
        </p>
        <Button
          className="mt-4"
          onClick={() => {
            window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
          }}
        >
          Open Gmail
        </Button>
      </div>
    </div>
  );
};

export default Page;
