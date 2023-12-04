import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MemeValidator } from "@/lib/validators/meme";
import { z } from "zod";

// type Coordinates = {
//   lat: number;
//   lng: number;
// };

export async function POST(req: Request) {
  //MAKE SURE USER IS LOGGED IN
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorised", { status: 401 });
  }

  try {
    const responseData = await req.formData();
    console.log("REQUEST MEME FORM DATA ", responseData);

    //VALIDATE THE REQUEST
    const { name, description, url, latlng, verified } = MemeValidator.parse({
      name: responseData.get("name") as string,
      description: responseData.get("description") as string,
      url: responseData.get("url") as string,
      video: "",
      screenshot: "",
      latlng: JSON.parse(responseData.get("latlng") as string),
      verified: JSON.parse(responseData.get("verified") as string),
    });
    console.log("THE FULL RESPONSE ", {
      name,
      description,
      url,
      latlng,
      verified,
    });

    // CHECK IF MEME NAME ALREAADY EXISTS / TODO: need to make string lowercase and no gaps etc
    const memeNameExists = await db.meme.findFirst({
      where: {
        name,
      },
    });
    console.log("MEME NAME EXISTS?", memeNameExists);

    if (memeNameExists) {
      console.log("THIS BACKEND MESSAGE CONFIRMS THAT THE MEME ALREADY EXISTS");

      return new Response("This Meme already exists", { status: 409 });
    }

    //Push the meme to the DB - session.user should also have id i think
    await db.meme.create({
      data: {
        name,
        description,
        url,
        fileUrl: "",
        lat: latlng.lat,
        lng: latlng.lng,
        verified,
        creatorId: session.user.id,
      },
    });

    //add meme to user's createdmemes
    // await db.user.update({
    //   where: { id: session.user.id },
    //   data: { createdMemes: { push: meme.id } },
    // });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not add meme", { status: 500 });
  }
}
