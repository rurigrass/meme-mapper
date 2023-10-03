import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { formatTimeToNow } from "@/lib/utils";

interface RequestedMemeProps {
  meme: Meme;
}

type Meme = {
  id: string;
  name: string;
  url: string;
  fileUrl: string;
  lat: number;
  lng: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string | null;
};

const RequestedMeme = ({ meme }: RequestedMemeProps) => {
  return (
    <Card className="">
      <CardHeader>
        <div className="flex space-x-4 text-sm text-muted-foreground justify-between">
          <div className="text-2xl dark:text-white text-black">{meme.name}</div>
          <div>Requested {formatTimeToNow(meme.createdAt)}</div>
        </div>
        {/* <CardDescription>{meme.url}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex text-xl">
          Status:
          {meme.verified ? (
            <p className="text-green-500 ml-1"> Approved ✅</p>
          ) : (
            <p className=" text-yellow-500 ml-1">Pending... </p>
          )}
        </div>
        {/* {!meme.verified && <Button>Edit</Button>} */}
      </CardContent>
    </Card>
  );
};

export default RequestedMeme;
