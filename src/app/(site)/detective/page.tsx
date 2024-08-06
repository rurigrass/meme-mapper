"use client";

import { useInfiniteDetectiveMemes } from "@/lib/hooks/useInfiniteDetectiveMemes";
import DetectiveMemeCard from "@/components/detective/search/DetectiveMemeCard";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import DetectiveMemeSkeleton from "@/components/detective/search/DetectiveMemeSkeleton";
import { VoteType } from "@prisma/client";

const Page = () => {
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
          {page.detectiveMemes.map((meme) => (
            <DetectiveMemeCard
              key={meme.id}
              meme={meme}
              currentVote={VoteType.UP}
              votesTotal={4}
            />
          ))}
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
