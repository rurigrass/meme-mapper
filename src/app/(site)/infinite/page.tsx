"use client";

import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDetectiveMemes } from "@/lib/hooks/useDetectiveMemes";

const Page = () => {
  const per_page = 6;

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["infiniteDetectiveMemes"],
      queryFn: ({ pageParam = 1 }) =>
        fetchDetectiveMemes({ pageParam, per_page }),
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = Math.ceil(lastPage.totalDetectiveMemes / per_page);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
    });

  return (
    <div className="flex flex-col">
      <div>
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.detectiveMemes.map((meme) => (
              <div key={meme.id}>{meme.name}</div>
            ))}
          </div>
        ))}
      </div>
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
