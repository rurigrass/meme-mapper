import MemesTable from "@/components/admin/MemeTable";
import { columns } from "@/components/admin/columns";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { MemeStatusTypes } from "@/lib/types";
import Link from "next/link";

export type memeTypeWithLatLng = {
  id: string;
  name: string;
  description: string;
  url: string;
  fileUrl: string;
  screenshotUrl: string;
  lat: number;
  lng: number;
  verified: boolean;
  status: MemeStatusTypes;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string | null;
};

const Page = async () => {
  const memes = await db.meme.findMany();

  return <MemesTable columns={columns} data={memes as memeTypeWithLatLng[]} />;
};

export default Page;
