"use client";

import PaginationControls from "@/components/detective/PaginationControls";
import { useDetectiveMemes } from "@/lib/hooks/useDetectiveMemes";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export type PageProps = {
  [key: string]: string | string[] | undefined;
};

const Page = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const per_page = Number(searchParams.get("per_page")) || 6;

  //FETCH THE DATA WITH THE TOTAL
  const { data, isLoading } = useDetectiveMemes(page, per_page);

  // console.log("THE DATA ", detectiveMemes);
  // console.log("THE NUMBER  ", totalDetectiveMemes);

  return (
    <div>
      DETECTIVE 🕵️‍♂️
      {data?.detectiveMemes?.map((meme, i) => (
        <div key={i}>{meme.name}</div>
      ))}
      <div>RESULTS HERE</div>
      {/* <div className="">PAGINATION CONTROLS HERE</div> */}
      {data && (
        <PaginationControls
          page={page}
          per_page={per_page}
          totalResults={data.totalDetectiveMemes}
        />
      )}
    </div>
  );
};

export default Page;
