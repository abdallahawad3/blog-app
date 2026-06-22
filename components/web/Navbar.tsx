import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ModeToggle } from "../theme/ModeToggle";

const Navbar = () => {
  return (
    <nav className="w-fll py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href={"/"}>
            <h1 className="text-3xl font-bold ">
              Next<span className="text-blue-500">Pro</span>
            </h1>
          </Link>
        </div>
        {/*Navigation Links */}
        <ul className="flex items-center gap-4">
          <Link className={buttonVariants({ variant: "ghost" })} href={"/"}>
            Home
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href={"/blog"}>
            Blog
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href={"/create"}>
            Create
          </Link>
        </ul>
      </div>
      {/* Buttons */}
      <div className="flex items-center gap-2">
        <Link className={buttonVariants({ variant: "default" })} href={"/auth/sign-up"}>
          Sign up
        </Link>
        <Link className={buttonVariants({ variant: "secondary" })} href={"/auth/login"}>
          Login
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
