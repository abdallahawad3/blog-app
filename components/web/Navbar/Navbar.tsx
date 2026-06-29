"use server";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import LogoutButton from "./logout-button";
import { isAuthenticated } from "@/lib/auth-server"; // ← Your server auth function

const Navbar = async () => {
  const authenticated = await isAuthenticated(); // Server-side check

  return (
    <nav className="w-full py-5 flex items-center justify-between border-b bg-background">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl font-bold">
            Next<span className="text-blue-500">Pro</span>
          </h1>
        </Link>

        <ul className="flex items-center gap-4">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">
            Home
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/blogs">
            Blog
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/create">
            Create
          </Link>
        </ul>
      </div>

      <div className="flex items-center gap-2">
        {!authenticated ? (
          <>
            <Link className={buttonVariants({ variant: "default" })} href="/auth/sign-up">
              Sign up
            </Link>
            <Link className={buttonVariants({ variant: "secondary" })} href="/auth/login">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link className={buttonVariants({ variant: "secondary" })} href="/dashboard">
              Dashboard
            </Link>
            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
