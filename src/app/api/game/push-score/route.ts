import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request) {
  //     const session = await getAuthSession();
  //     if (session?.user) {
  //   }
  try {
    const body = await req.json();
    console.log("RESPONSE DATA ", body);
    return new Response("OK");
  } catch (error) {}
}
