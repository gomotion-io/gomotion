"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <Button variant="link" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};
