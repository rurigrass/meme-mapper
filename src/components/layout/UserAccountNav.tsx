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

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
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
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm">{user.email}</p>
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
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
