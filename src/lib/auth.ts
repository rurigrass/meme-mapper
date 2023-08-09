import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
// };

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "name@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
        username: { label: "Username", type: "text", placeholder: "username" },
      },
      async authorize(credentials) {
        const user = {
          id: 1,
          username: "ruri",
          email: "ruripg@gmail.com",
          password: "Brandon117@!",
        };

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user as any;
        } else {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const getAuthSession = () => getServerSession(authOptions);
