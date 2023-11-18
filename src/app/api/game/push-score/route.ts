import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request) {
  //MAKE SURE USER IS LOGGED IN
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorised", { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("RESPONSE DATA ", body);

    return new Response("OK");
  } catch (error) {}
}
