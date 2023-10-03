import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

type UserId = string;

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      username: string;
      idontknow: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: UserRole;
  }
}
