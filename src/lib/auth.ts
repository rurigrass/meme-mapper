import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

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
        //CHECK EMAIL AND PASSWORD ARE VALID
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        //CHECK IF USER EXISTS
        const user: User | null = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        //RETURN NULL IF NO USER
        if (!user) {
          return null;
        }

        //IF USER IS FOUND CHECK PASSWORDS MATCH
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword || ""
        );

        //IF PASSWORDS DONT MATCH RETURN NULL
        if (!passwordsMatch) {
          return null;
        }

        //RETURN THE USER IF PASSWORDS MATCH
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },

    redirect() {
      return "/";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
