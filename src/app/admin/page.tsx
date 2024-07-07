import MemesTable from "@/components/admin/MemeTable";
import { columns } from "@/components/admin/columns";
import { db } from "@/lib/db";
import { memeTypeApproved } from "@/lib/types";
import Link from "next/link";

const Page = async () => {
  const memes = await db.meme.findMany();

  return <MemesTable columns={columns} data={memes as memeTypeApproved[]} />;
};

export default Page;
