"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "@/components/spinner";

const LicenseFormSchema = z.object({
  email: z.string().email(),
  licenseKey: z.string(),
});

export type LicenseFormData = z.infer<typeof LicenseFormSchema>;

const SignIn = () => {
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const signIn = (data: LicenseFormData) => {
    console.log(data);
  };

  const form = useForm<LicenseFormData>({
    resolver: zodResolver(LicenseFormSchema),
    defaultValues: {
      email: "",
      licenseKey: "",
    },
  });

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-36 gap-10 px-5">
      <div className="flex flex-col items-center justify-center">
        <Link href="/" className="mb-4">
          <Image src="/gomotion.png" alt="gomotion" width={40} height={40} />
        </Link>
        <div className="text-xl font-medium mb-3">Sign in to your account</div>

        <div className="text-stone-400 max-w-sm text-center">
          Enter your license key and the email address you used to purchase it.
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signIn)}
          className="space-y-4 max-w-sm w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="owner@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="licenseKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-5 gap-4">
            Sign in {loading && <Spinner className="text-stone-950" />}
          </Button>

          {error && <div className="text-sm text-red-500">{error}</div>}
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
