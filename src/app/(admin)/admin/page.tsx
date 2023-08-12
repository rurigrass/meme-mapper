import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  return (
    <div className="">
      <Link href={"/admin/add-meme"}>
        <Button>Add New Meme</Button>
      </Link>
    </div>
  );
};

export default Page;
