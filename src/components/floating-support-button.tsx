"use client";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

export const FloatingSupportButton = () => {
  return (
    <>
      <Card className="hidden md:flex pt-0 rounded-[20px] p-[8px] w-[15rem] h-80 flex-col gap-2 border fixed top-[5rem] right-6 z-50">
        <Image
          src="/images/join-community.jpg"
          alt="Gomotion preview"
          className="w-full object-cover overflow-hidden rounded-[16px] mb-4"
          width={500}
          height={500}
          draggable={false}
          unoptimized
        />
        <CardHeader className="font-semibold">
          <div className="text-center text-sm">
            Get early access, AI prompts, Free credits and Direct support from
            the Gomotion team.
          </div>
        </CardHeader>
        <CardContent className="flex justify-center px-0">
          <Link
            href="https://discord.gg/Wd4nCJhCgd"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              asChild
              size="lg"
              className="w-full bg-emerald-100 text-emerald-900 hover:bg-emerald-200 py-1 px-3 transition-colors duration-300 font-medium text-sm rounded-md"
            >
              <div className="flex items-center gap-2 px-4 py-3">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span className="font-medium">Join Gomotion Discord</span>
              </div>
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="md:hidden fixed top-[5rem] right-6 z-50">
        <Link
          href="https://discord.gg/Wd4nCJhCgd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            asChild
            size="lg"
            className="bg-emerald-100 text-emerald-900 hover:bg-emerald-200 py-1 px-3 transition-colors duration-300 font-medium text-sm rounded-md"
          >
            <div className="flex items-center gap-2 px-4 py-3">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span className="font-medium">Join Gomotion Discord</span>
            </div>
          </Button>
        </Link>
      </div>
    </>
  );
};
