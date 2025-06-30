import { Profile } from "@/components/profile";
import { getUser } from "@/supabase/server-functions/users";
import Image from "next/image";
import Link from "next/link";

export const Header = async () => {
  const user = await getUser();

  return (
    <div className="flex items-center justify-between h-[5rem] w-full px-5 sm:px-10 header">
      <Link href="/">
        <div className="flex items-center gap-2">
          <div className="">
            <Image
              src="/images/logos/logo_light.png"
              alt="gomotion"
              width={20}
              height={20}
            />
          </div>
        </div>
      </Link>
      <div className="flex items-center">
        {user ? (
          <Profile />
        ) : (
          <div className="flex gap-4">
            <Link href="/pricing">
              <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                Get started
              </div>
            </Link>
            <Link href="/sign-in">
              <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                Sign In
              </div>
            </Link>
            <Link href="/register">
              <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
                Register
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
