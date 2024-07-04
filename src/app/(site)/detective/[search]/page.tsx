"use client";
import { useDetectiveMemes } from "@/lib/hooks/useDetectiveMemes";

export type PageProps = {
  [key: string]: string | string[] | undefined;
};

const Page = (searchParams: PageProps) => {
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "5");

  console.log("THE PROPS ", page);
  console.log("THE PROPS ", per_page);
  // const { data: memes } = useDetectiveMemes(page, per_page);
  // console.log("THE DATA ", memes);

  return (
    <div>
      DETECTIVE 🕵️‍♂️
      {/* {memes.map((meme) => (
        <div>{meme}</div>
      ))} */}
      <div>RESULTS HERE</div>
      <div className="">PAGINATION CONTROLS HERE</div>
    </div>
  );
};

export default Page;
