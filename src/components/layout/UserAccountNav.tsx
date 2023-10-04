"use client";
import { User } from "next-auth";
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
import { LogOut, User2Icon } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

interface UserAccountNavProps {
  user: Pick<User, "id" | "name" | "image" | "email">;
}

const UserAccountNav = ({ user }: UserAccountNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User2Icon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-auto" align="end">
        <Link href={`/user/${user.id}`}>
          <DropdownMenuItem className="flex items-center justify-start gap-2 p-2 hover:cursor-pointer">
            <div className="flex flex-col space-y-1 leading-none">
              {user.name && <p className="font-medium">{user.name}</p>}
            </div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`${
            (buttonVariants({ variant: "outline" }),
            " w-auto flex flex-row justify-center hover:cursor-pointer ")
          }`}
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              // returns you to the home page
              callbackUrl: `/`,
            });
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
        {/* </DropdownMenuRadioGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
