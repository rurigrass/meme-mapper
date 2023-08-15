"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { data: session, status, update } = useSession();
  console.log(session);

  return (
    <div className="">
      <Link href={"/admin/add-meme"}>
        <Button>Add New Meme</Button>
      </Link>
    </div>
  );
};

export default Page;
