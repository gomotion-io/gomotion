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
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
  email: z.string().email(),
});

export type FormData = z.infer<typeof FormSchema>;

export const ForgotPassword = () => {
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const mailSent = useAuthStore((state) => state.mailSent);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="flex h-screen w-full px-5 sm:p-10 bg-stone-50">
      {/* ---------- Left / Form section ---------- */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-4 sm:px-6 md:px-10 lg:px-24 mx-auto">
        <div className="flex flex-col items-center justify-center mb-10">
          <Link href="/" className="mb-4">
            <Image
              src="/images/gomotion.svg"
              alt="gomotion"
              width={45}
              height={45}
              unoptimized
            />
          </Link>
          {!mailSent && (
            <div className="text-2xl mb-3 max-w-sm text-center">
              Enter your email to reset your password
            </div>
          )}
        </div>

        {mailSent ? (
          <div className="flex items-center flex-col gap-1 text-center min-h-80">
            <p className="text-xl mb-4 max-w-xs">
              We have sent you an email to reset your password.
            </p>
            <Button
              type="button"
              variant="outline"
              className=""
              onClick={() => {
                window.open(
                  "https://mail.google.com/mail/u/0/#inbox",
                  "_blank"
                );
              }}
            >
              Open Gmail
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(forgotPassword)}
              className="space-y-4 max-w-sm w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="shadow-none px-4 h-12 focus:ring-offset-0 focus:outline-none focus:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-1 gap-4 h-12"
                disabled={loading}
              >
                Submit
                {loading && <Spinner />}
              </Button>

              {error && (
                <div className="text-sm text-red-500 mt-4">{error}</div>
              )}
            </form>
          </Form>
        )}
      </div>

      {/* ---------- Right / Image section ---------- */}
      <div className="hidden md:block md:w-1/2 relative rounded-3xl overflow-hidden">
        <Image
          src="/images/register.jpg"
          alt="Gomotion preview"
          fill
          className="object-cover"
          draggable={false}
          unoptimized
        />
      </div>
    </div>
  );
};
