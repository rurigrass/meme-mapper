import { db } from "@/lib/db";

export async function GET(req: Request) {
  console.log("API ROUTE REQ ", req.url);

  //FIRST GET THE URL PARAMS
  let page: number;
  let per_page: number;

  //http://localhost:3000/detective?page=1&per_page=3 example but doesnt actually work.
  if (typeof req.url === "string") {
    const { searchParams } = new URL(req.url);
    page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
    per_page = searchParams.get("per_page")
      ? Number(searchParams.get("per_page"))
      : 6;
  } else {
    page = 1;
    per_page = 6;
  }

  //THEN FETCH THE DATA
  //ORDERBY COULD BE ITS OWN VARIABLE ( MOST POPULAR, MOST RECENT, ETC )
  try {
    const [totalDetectiveMemes, detectiveMemes] = await db.$transaction([
      db.meme.count({
        where: { status: { equals: "DETECTIVE" } },
      }),
      db.meme.findMany({
        skip: (page - 1) * per_page,
        take: per_page,
        where: { status: { equals: "DETECTIVE" } },
        select: {
          id: true,
          name: true,
          screenshotUrl: true,
          fileUrl: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return new Response(
      JSON.stringify({ totalDetectiveMemes, detectiveMemes })
    );
  } catch (error) {
    return new Response("Could not fetch detective memes", { status: 500 });
  }
}
