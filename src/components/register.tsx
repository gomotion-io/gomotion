"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import * as z from "zod"; // "terms" must be checked, otherwise the schema will fail

// "terms" must be checked, otherwise the schema will fail
const FormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

export type FormData = z.infer<typeof FormSchema>;

export const Register = () => {
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const register = useAuthStore((state) => state.register);
  const mailSent = useAuthStore((state) => state.mailSent);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
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
          <div className="text-2xl font-medium mb-3">
            {mailSent
              ? "Thank you for joining Gomotion !"
              : "Get access to Gomotion"}
          </div>
        </div>

        {mailSent ? (
          <div className="flex flex-col items-center gap-1 text-center min-h-80">
            <p className="text-muted-foreground mb-10">
              We have sent you an email to confirm your account.
            </p>

            <Button
              type="button"
              className="w-full mt-4 gap-4 h-12"
              onClick={() => {
                window.open(
                  "https://mail.google.com/mail/u/0/#inbox",
                  "_blank",
                );
              }}
            >
              Open Gmail
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(({ email, password }) =>
                register({ email, password }),
              )}
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        className="shadow-none px-4 h-12 focus:ring-offset-0 focus:outline-none focus:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms and conditions checkbox */}
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3 py-3">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label htmlFor="terms" className="leading-none gap-1">
                      Accept
                      <span className="underline">
                        <Link href="/terms">terms and conditions</Link>
                      </span>
                    </Label>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-1 gap-4 h-12"
                disabled={loading}
              >
                Request access
                {loading && <Spinner />}
              </Button>

              <Link href="/sign-in">
                <div className="text-muted-foreground text-end text-sm font-semibold">
                  Already have an account ?{" "}
                  <span className="text-primary underline"> Login here</span>
                </div>
              </Link>

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
