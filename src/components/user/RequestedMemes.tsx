import Link from "next/link";
import RequestedMeme from "./RequestedMeme";
import { Button } from "../ui/button";

interface RequestedMemesProps {
  requestedMemes: Meme[];
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

const RequestedMemes = ({ requestedMemes }: RequestedMemesProps) => {
  return (
    <>
      <div className="mx-2 flex justify-between items-center">
        <div className="text-xl ">Your Meme requests:</div>
        {requestedMemes.length > 0 && (
          <Link href={"/request"} className=" ">
            <Button>Request Meme</Button>
          </Link>
        )}
      </div>
      <div className="h-0.5 w-full mt-1 bg-white"></div>
      <div className="m-4 h-full">
        {requestedMemes.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-2">
            {requestedMemes.map((meme) => (
              <RequestedMeme key={meme.id} meme={meme} />
            ))}
          </div>
        ) : (
          <div className="h-full flex justify-center items-center">
            <div className="flex flex-col gap-3">
              You have not requested any memes
              <Link href={"/request"} className=" flex justify-center">
                <Button>Request Meme</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RequestedMemes;
