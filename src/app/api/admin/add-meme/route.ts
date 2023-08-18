import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MemeValidator } from "@/lib/validators/meme";
import axios from "axios";
import { z } from "zod";

export async function POST(req: Request) {
  //MAKE SURE USER IS LOGGED IN
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorised", { status: 401 });
  }

  try {
    const responseData = await req.formData();

    //VALIDATE THE REQUEST
    const { name, url, video } = MemeValidator.parse({
      name: responseData.get("name") as string,
      url: responseData.get("url") as string,
      video: responseData.get("file") as File,
    });

    console.log("NAME ", name);

    // //CHECK IF MEME NAME ALREAADY EXISTS / TODO: need to make string lowercase and no gaps etc
    const memeNameExists = await db.meme.findFirst({
      where: {
        name,
      },
    });
    console.log("MEME NAME EXISTS?", memeNameExists);

    if (memeNameExists) {
      return new Response("This Meme already exists", { status: 409 });
    }

    //CHECK THERES ACTUALLY A VIDEO THERE
    if (typeof video === "undefined") {
      return new Response("Video file does not exist", { status: 400 });
    }

    //CREATE FORMDATA OBJECT TO UPLOAD FILE
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "test-mememapper-unsigned");
    formData.append("api_key", process.env.CLOUDINARY_SECRET as string | Blob);

    //POST THE VIDEO AND GET BACK ITS ID
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/auto/upload`,
      formData
    );

    //THIS IS WHAT WE WANT
    console.log("AND  THE RESULTS ARE.... ", data.secure_url);

    //Push the meme to the DB - session.user should also have id i think
    await db.meme.create({
      data: {
        name,
        url,
        fileUrl: data.secure_url,
        creatorId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not add meme", { status: 500 });
  }
}

//OLD CODE:
// const nameValue: string = data.get("name") as string;
// const urlValue: string = data.get("url") as string;
// const videoValue: File | null = data.get("file") as unknown as File;
