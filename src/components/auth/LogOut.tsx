"use client";

import { FC } from "react";
import { signOut } from "next-auth/react";

interface LogoutProps {}

const Logout: FC<LogoutProps> = ({}) => {
  return (
    <div
      className="hover: cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        signOut({
          // returns you to the page you were on
          callbackUrl: `/`,
        });
      }}
    >
      Logout
    </div>
  );
};

export default Logout;
