import MemesTable from "@/components/admin/MemeTable";
import { columns } from "@/components/admin/columns";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";

interface pageProps {}

const Page = async () => {
  const session = await getAuthSession();
  const memes = await db.meme.findMany();
  // console.log(memes);
  if (session?.user.role !== "ADMIN") {
    throw new Error("Page only accesible to admins");
  }
  return (
    <div>
      <div></div>
      <MemesTable columns={columns} data={memes} />
    </div>
  );
};

export default Page;
