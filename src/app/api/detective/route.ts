import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.searchParams);

  const { page, per_page } = req.nextUrl.searchParams;

  console.log("HERE IS THE REQUEST  ", page, per_page);

  return new Response("hello");
}

// type QueryKey = [string, { page: number; per_page: number }];

// const fetchMemes = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
//   const [_key, { page, per_page }] = queryKey;

//   const memes = await db.meme.findMany({
//     skip: (page - 1) * per_page,
//     take: per_page,
//     where: { status: { equals: "DETECTIVE" } },
//     select: {
//       id: true,
//       name: true,
//     },
//     orderBy: { createdAt: "desc" },
//   });

//   console.log(memes);

//   return {
//     data: memes,
//     metadata: {},
//   };
// };
