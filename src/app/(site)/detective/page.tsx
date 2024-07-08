"use client";

import { Button } from "@/components/ui/button";
import { useInfiniteDetectiveMemes } from "@/lib/hooks/useInfiniteDetectiveMemes";
import DetectiveMeme from "@/components/detective/DetectiveMeme";

const Page = () => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteDetectiveMemes(4);

  console.log("FETCH THE MEMES ", data);

  return (
    <div className="">
      {data?.pages.map((page, i) => (
        <div key={i} className="flex flex-wrap justify-center">
          {page.detectiveMemes.map((meme) => (
            <DetectiveMeme key={meme.id} meme={meme} />
          ))}
        </div>
      ))}
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load more"
          : "No more results"}
      </Button>
    </div>
  );
};

export default Page;
