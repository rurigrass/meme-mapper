import { Button } from "@/components/ui/button";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      page
      <Button>Add Meme</Button>
    </div>
  );
};

export default page;
