import MemeVotesClient from "@/components/votes/meme-votes/MemeVotesClient";
import { Vote } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

//THIS PICKS ONE OF THE TYPES IN VOTE.TYPE ENUM - COULD BE HANDY FOR OTHER ENUMS IN THE APP.
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
  //MAYBE CHANGE THIS TO STRING IDK
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
    <div className="relative border-2 rounded-lg shadow-sm bg-card overflow-hidden m-2 w-full lg:w-[600px] max-w-full">
      <Link className="flex" href={`/detective/${meme.id}`}>
        <div className="relative h-[200px] w-[200px] sm:h-[300px] sm:w-[300px]">
          <Image
            alt={image}
            src={image}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="p-2 "> {name}</div>
      </Link>
      {/* MemeVotesClient component placed outside Link */}
      <div className="absolute right-0 top-0 z-10 h-full">
        <MemeVotesClient
          memeId={meme.id}
          initialVote={currentVote?.type}
          initialVotesAmount={votesTotal}
        />
      </div>
    </div>
  );
};

export default DetectiveMemeCard;
