import MemesTable from "@/components/admin/MemeTable";
import { columns } from "@/components/admin/columns";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface pageProps {}

const Page = async () => {
  // const { data: session, status, update } = useSession();
  // console.log(session);
  const memes = await db.meme.findMany();
  // console.log(memes);

  return (
    <div className="">
      <div></div>
      <MemesTable columns={columns} data={memes} />
    </div>
  );
};

export default Page;
