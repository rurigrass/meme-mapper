import MemesTable from "@/components/admin/MemeTable";
import { columns } from "@/components/admin/columns";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { memeType } from "@/lib/types";
import Link from "next/link";

interface pageProps {}

const Page = async () => {
  const memes = await db.meme.findMany();

  return <MemesTable columns={columns} data={memes as memeType[]} />;
};

export default Page;
