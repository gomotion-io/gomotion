"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getEnvUrl } from "@/lib/utils";
import { createClient } from "@/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const LicenseFormSchema = z.object({
  email: z.string().email(),
});

export type LicenseFormData = z.infer<typeof LicenseFormSchema>;

type SignProps = {
  type: "Register" | "Login";
};

export const Sign: FC<SignProps> = ({ type }) => {
  const isRegister = type === "Register";
  const title = isRegister ? "Create your account" : "Sign in to your account";
  const description = isRegister
    ? "Enter your email address to create an account."
    : "Enter your email address to continue";
  const buttonText = isRegister ? "Register with email" : "Sign in with email";
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const signIn = useCallback(
    async ({ email }: LicenseFormData) => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: getEnvUrl(),
        },
      });
      if (!error && !data.user) {
        router.push(`/mail-sent`);
      }
      setIsLoading(false);
    },
    [router, supabase.auth],
  );

  const form = useForm<LicenseFormData>({
    resolver: zodResolver(LicenseFormSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="w-full flex flex-col items-center pt-36 gap-10 px-5">
      <div className="flex flex-col items-center justify-center">
        <Link href="/" className="mb-4">
          <Image src="/gomotion.png" alt="gomotion" width={40} height={40} />
        </Link>
        <div className="text-xl font-medium mb-3">{title}</div>

        <div className="text-stone-400 max-w-sm text-center">{description}</div>
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
                <FormControl>
                  <Input placeholder="owner@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-1 gap-4"
            disabled={isLoading}
          >
            {buttonText}
            {isLoading && <Spinner className="text-stone-950" />}
          </Button>

          {error && <div className="text-sm text-red-500">{error}</div>}
        </form>
      </Form>
    </div>
  );
};
