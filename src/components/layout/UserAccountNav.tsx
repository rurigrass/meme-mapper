"use client";
import { User } from "next-auth";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import UserAvatar from "../user/UserAvatar";
// import { Icons } from "./Icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { buttonVariants } from "../ui/button";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-zinc-900">
        {user.email}
        {/* <UserAvatar
          className="h-8 w-8"
          user={{ name: user.name || null, image: user.image || null }}
        /> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-56" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup>
          {/* <DropdownMenuItem className="hover:cursor-pointer">
            <Icons.user className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            <Icons.tea className="mr-2 h-4 w-4" />
            <span>Spill Tea</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            <Icons.settings className="mr-2 h-4 w-4" />
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            className={`${
              (buttonVariants({ variant: "outline" }),
              " bg-black w-auto flex flex-row ")
            }`}
            onSelect={(event) => {
              event.preventDefault();
              signOut({
                // returns you to the page you were on
                callbackUrl: `${window.location.origin}/sign-in`,
              });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
