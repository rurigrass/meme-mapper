import MemesTable from "@/components/admin/MemeTable";
import { columns } from "@/components/admin/columns";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";

interface pageProps {}

const Page = async () => {
  const memes = await db.meme.findMany();

  return <MemesTable columns={columns} data={memes} />;
};

export default Page;
