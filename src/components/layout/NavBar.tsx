import Link from "next/link";
// import { Icons } from "./Icons";
// import { buttonVariants } from "../ui/Button";
import { authOptions, getAuthSession } from "@/lib/auth";
import { getServerSession } from "next-auth";
// import UserAccountNav from "./UserAccountNav";
// import SearchBar from "./SearchBar";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";
import UserAccountNav from "./UserAccountNav";
import { ModeToggle } from "./ModeToggle";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="top-0 z-20 py-1.5">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <div>
          <Link href="/">
            {/* <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" /> */}
            {/* hidden sm:block */}
            <p className=" text-blue-600 font-extrabold">MEMEMAPPER</p>
          </Link>
        </div>
        <div className="flex flex-row align-middle gap-2">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link
              href="/login"
              className={`${buttonVariants({
                variant: "outline",
              })}
            `}
            >
              <span className="hidden md:block sm:mr-1.5 ">Sign In</span>
              <LogIn />
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
