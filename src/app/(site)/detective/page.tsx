"use client";

import { useInfiniteDetectiveMemes } from "@/lib/hooks/useInfiniteDetectiveMemes";
import DetectiveMemeCard from "@/components/detective/search/DetectiveMemeCard";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import DetectiveMemeSkeleton from "@/components/detective/search/DetectiveMemeSkeleton";
import { VoteType } from "@prisma/client";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();

  const bottomOfPage = useRef<HTMLDivElement>(null);
  const isInView = useInView(bottomOfPage);

  //maybe add a screensize hook here to change the number of memes that are retrieved on load https://medium.com/@josephat94/building-a-simple-react-hook-to-detect-screen-size-404a867fa2d2
  const numberOfMemes = 6;
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteDetectiveMemes(numberOfMemes);

  //NEED TO GET THE VOTES.

  useEffect(() => {
    if (isInView && hasNextPage) fetchNextPage();
  }, [isInView]);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i} className="flex flex-wrap justify-center">
          {page.detectiveMemes.map((meme) => {
            const votesTotal = meme.votes.reduce((acc, vote) => {
              if (vote.type === "UP") return acc + 1;
              if (vote.type === "DOWN") return acc - 1;
              return acc;
            }, 0);

            const currentVote = meme.votes.find(
              (vote) => vote.voterId === session?.user.id
            );

            console.log(currentVote);

            return (
              <DetectiveMemeCard
                key={meme.id}
                meme={meme}
                currentVote={currentVote}
                votesTotal={votesTotal}
              />
            );
          })}
        </div>
      ))}
      {(isLoading || isFetchingNextPage) && (
        <div className="flex flex-wrap justify-center">
          {[...Array(numberOfMemes)].map((_, i) => (
            <DetectiveMemeSkeleton key={i} />
          ))}
        </div>
      )}
      <div ref={bottomOfPage} className="w-full flex justify-center pb-2">
        {!hasNextPage ? "You have reached the bottom" : " "}
      </div>
    </div>
  );
};

export default Page;
