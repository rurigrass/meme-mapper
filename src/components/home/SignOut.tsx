"use client";

import { signOut } from "next-auth/react";

interface SignOutProps {
  children: React.ReactNode;
}

const SignOut = ({ children }: SignOutProps) => {
  return (
    <div
      onClick={() =>
        signOut({
          // returns you to the home page
          callbackUrl: `/`,
        })
      }
    >
      {children}
    </div>
  );
};

export default SignOut;
