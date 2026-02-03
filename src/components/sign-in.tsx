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
  password: z.string(),
});

export type FormData = z.infer<typeof FormSchema>;

export const SignIn = () => {
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const signIn = useAuthStore((state) => state.signIn);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
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
          <div className="text-2xl mb-3">Login</div>
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
                  <Label htmlFor="email">Password</Label>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type="password"
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
              Login
              {loading && <Spinner />}
            </Button>

            <Link href="/register">
              <div className="text-muted-foreground text-end text-sm mb-2">
                No account ?{" "}
                <span className="text-primary underline">Register here </span>
              </div>
            </Link>

            <Link href="/forgot-password">
              <div className="text-muted-foreground text-end text-sm">
                Forgot password ?{" "}
                <span className="text-primary underline">
                  Reset password here
                </span>
              </div>
            </Link>

            {error && <div className="text-sm text-red-500 mt-4">{error}</div>}
          </form>
        </Form>
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
