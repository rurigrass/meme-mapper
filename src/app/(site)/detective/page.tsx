"use client";

import { useInfiniteDetectiveMemes } from "@/lib/hooks/useInfiniteDetectiveMemes";
import DetectiveMeme from "@/components/detective/search/DetectiveMeme";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import DetectiveMemeSkeleton from "@/components/detective/search/DetectiveMemeSkeleton";

const Page = () => {
  const bottomOfPage = useRef<HTMLDivElement>(null);
  const isInView = useInView(bottomOfPage);

  //maybe add a screensize hook here to change the number of memes that are retrieved on load https://medium.com/@josephat94/building-a-simple-react-hook-to-detect-screen-size-404a867fa2d2
  const numberOfMemes = 6;
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteDetectiveMemes(numberOfMemes);

  useEffect(() => {
    if (isInView && hasNextPage) fetchNextPage();
  }, [isInView]);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i} className="flex flex-wrap justify-center">
          {page.detectiveMemes.map((meme) => (
            <DetectiveMeme key={meme.id} meme={meme} />
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
