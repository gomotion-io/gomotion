"use client";
import { Button } from "@/components/ui/button";
import { OAuthProvider, useAuthStore } from "@/store/auth.store";
import { Github, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

const providers: { id: OAuthProvider; label: string; icon: ReactNode }[] = [
  {
    id: "google",
    label: "Continue with Google",
    icon: (
      <Image
        src="/models-icons/google.svg"
        alt=""
        width={18}
        height={18}
        unoptimized
      />
    ),
  },
  {
    id: "github",
    label: "Continue with GitHub",
    icon: <Github className="size-[18px]" />,
  },
];

type SignInProps = {
  error?: string | null;
};

export const SignIn = ({ error: initialError }: SignInProps) => {
  const pendingProvider = useAuthStore((state) => state.pendingProvider);
  const error = useAuthStore((state) => state.error);
  const signInWithProvider = useAuthStore((state) => state.signInWithProvider);
  const reset = useAuthStore((state) => state.reset);

  // Re-enable the buttons when the page is restored from the back/forward
  // cache after leaving for the provider.
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) reset();
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [reset]);

  const displayedError = error ?? initialError;

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
          <div className="text-2xl font-medium mb-2">Welcome to Gomotion</div>
          <p className="text-muted-foreground">Log in or create an account</p>
        </div>

        <div className="space-y-4 max-w-sm w-full">
          {providers.map((provider) => (
            <Button
              key={provider.id}
              type="button"
              variant="outline"
              className="w-full h-12 gap-3"
              disabled={pendingProvider !== null}
              onClick={() => signInWithProvider(provider.id)}
            >
              {pendingProvider === provider.id ? (
                <Loader2 className="size-[18px] animate-spin" />
              ) : (
                provider.icon
              )}
              {provider.label}
            </Button>
          ))}

          <p className="text-muted-foreground text-center text-sm pt-2">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-primary underline">
              terms and conditions
            </Link>
            .
          </p>

          {displayedError && (
            <div className="text-sm text-red-500 text-center">
              {displayedError}
            </div>
          )}
        </div>
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
