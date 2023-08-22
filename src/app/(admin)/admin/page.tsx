import MemeTable from "@/components/admin/MemeTable";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface pageProps {}

const Page = async () => {
  // const { data: session, status, update } = useSession();
  // console.log(session);
  const memes = await db.meme.findMany({
    select: {},
  });

  return (
    <div className="">
      <Link href={"/admin/add-meme"}>
        <Button>Add New Meme</Button>
      </Link>
      <MemeTable memes={memes} />
    </div>
  );
};

export default Page;
