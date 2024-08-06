import MemeVotesClient from "@/components/votes/meme-votes/MemeVotesClient";
import { Vote } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type PartialVote = Pick<Vote, "type">;

type DetectiveMemeType = {
  id: string;
  name: string;
  fileUrl: string;
  screenshotUrl: string;
};

type DetectiveMemeCardProps = {
  meme: DetectiveMemeType;
  //RECEIVE VOTESAMOUNT
  votesTotal: number;
  currentVote?: PartialVote;
};

const DetectiveMemeCard = ({
  meme,
  votesTotal,
  currentVote,
}: DetectiveMemeCardProps) => {
  const { name, fileUrl, screenshotUrl } = meme;
  //USE SCREENSHOT IF FILE IS VIDEO
  let image = fileUrl.includes("/video") ? screenshotUrl : fileUrl;

  return (
    <Link
      className="flex border-2 rounded-lg shadow-sm bg-card overflow-hidden m-2 w-full lg:w-[600px] max-w-full"
      href={`/detective/${meme.id}`}
    >
      <div className="relative h-[200px] w-[200px] sm:h-[300px] sm:w-[300px]">
        <Image
          alt={image}
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-2 text-center"> {name}</div>
      <MemeVotesClient
        memeId={meme.id}
        initialVote={currentVote?.type}
        initialVotesAmount={votesTotal}
      />
    </Link>
  );
};

export default DetectiveMemeCard;
