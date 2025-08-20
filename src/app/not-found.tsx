import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      <h2 className="text-2xl font-bold">404 Not Found</h2>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>

      <Link href="/" className="text-primary">
        <Button variant="outline">Return Home</Button>
      </Link>
    </div>
  );
}
