import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MemeValidator } from "@/lib/validators/meme";
import axios from "axios";
import { z } from "zod";

// type Coordinates = {
//   lat: number;
//   lng: number;
// };

export async function PATCH(req: Request) {
  //MAKE SURE USER IS LOGGED IN
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorised", { status: 401 });
  }

  try {
    const responseData = await req.formData();
    console.log("RESPONSE DATA ", responseData);

    //VALIDATE THE REQUEST
    const { id, name, description, url, video, screenshot, latlng, verified } =
      MemeValidator.parse({
        id: responseData.get("id") as string,
        name: responseData.get("name") as string,
        description: responseData.get("description") as string,
        url: responseData.get("url") as string,
        video: responseData.get("file") as File,
        screenshot: responseData.get("screenshot") as File,
        latlng: JSON.parse(responseData.get("latlng") as string),
        verified: JSON.parse(responseData.get("verified") as string),
      });
    console.log("THE FULL RESPONSE ", {
      id,
      name,
      description,
      url,
      video,
      screenshot,
      latlng,
      verified,
    });

    // CHECK IF MEME NAME ALREAADY EXISTS / TODO: need to make string lowercase and no gaps etc
    // const memeNameExists = await db.meme.findFirst({
    //   where: {
    //     name,
    //   },
    // });
    // console.log("MEME NAME EXISTS?", memeNameExists);

    // if (memeNameExists) {
    //   return new Response("This Meme already exists", { status: 409 });
    // }

    //CHECK THERES ACTUALLY A VIDEO THERE // THIS IS NOT REALLY THAT IMPORTANT
    let fileUrl: string;
    let screenshotDataCloudinary: string;

    console.log("VIDEO ", video, "SCREENSHOT ", screenshot);

    if (typeof video === "string") {
      fileUrl = video;
    } else if (typeof video === "object") {
      //CREATE FORMDATA OBJECT TO UPLOAD FILE
      const formData = new FormData();
      formData.append("file", video);
      formData.append("upload_preset", "test-mememapper-unsigned");
      formData.append(
        "api_key",
        process.env.CLOUDINARY_SECRET as string | Blob
      );
      //POST THE VIDEO AND GET BACK ITS ID
      const {
        data: { secure_url },
      } = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/auto/upload`,
        formData
      );
      fileUrl = secure_url;
    } else {
      return new Response("Video file does not exist", { status: 400 });
    }

    if (typeof screenshot === "string") {
      screenshotDataCloudinary = screenshot;
    } else if (typeof screenshot === "object") {
      const screenshotData = new FormData();
      screenshotData.append("file", screenshot);
      screenshotData.append("upload_preset", "test-mememapper-unsigned");
      screenshotData.append(
        "api_key",
        process.env.CLOUDINARY_SECRET as string | Blob
      );
      //POST SCREENSHOT AND GET BACK ID
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/auto/upload`,
        screenshotData
      );
      screenshotDataCloudinary = data.secure_url;
    } else {
      return new Response("Screenshot file does not exist", { status: 400 });
    }

    // ONLY IF ITS TYPE FILE
    //Push the meme to the DB - session.user should also have id i think
    await db.meme.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        url,
        fileUrl,
        screenshotUrl: screenshotDataCloudinary,
        lat: latlng.lat,
        lng: latlng.lng,
        verified,
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
