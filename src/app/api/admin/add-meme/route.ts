import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MemeValidator } from "@/lib/validators/meme";
import axios from "axios";
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

    //VALIDATE THE REQUEST
    const {
      name,
      description,
      url,
      video,
      screenshot,
      latlng,
      verified,
      status,
    } = MemeValidator.parse({
      name: responseData.get("name") as string,
      description: responseData.get("description") as string,
      url: responseData.get("url") as string,
      video: responseData.get("file") as File,
      screenshot: responseData.get("screenshot") as File,
      latlng: JSON.parse(responseData.get("latlng") as string),
      verified: JSON.parse(responseData.get("verified") as string),
      status: JSON.parse(responseData.get("status") as string),
    });

    console.log("THE FULL RESPONSE ", {
      name,
      description,
      url,
      video,
      screenshot,
      latlng,
      verified,
      status,
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

    //CHECK THERES ACTUALLY A VIDEO THERE (THIS LOOKS UNNECESSARY)
    if (typeof video === "undefined") {
      return new Response("File does not exist", { status: 400 });
    }

    //CREATE FORMDATA OBJECT TO UPLOAD FILE
    const fileData = new FormData();
    fileData.append("file", video);
    fileData.append("upload_preset", "test-mememapper-unsigned");
    fileData.append("api_key", process.env.CLOUDINARY_SECRET as string | Blob);

    //POST THE VIDEO AND GET BACK ITS ID
    const { data: fileDataCloudinary } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/auto/upload`,
      fileData
    );

    //CREATE FORMDATA OBJECT OF SCREENSHOT (IF EXISTS) TO UPLOADFILE
    let screenshotDataCloudinary = "";
    //POST SCREENSHOT AND GET BACK ID (ONLY IF FILE IS VIDEO)
    //try if (typeof screenshot !== "string")
    if (screenshot !== "") {
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
    }

    //Push the meme to the DB - session.user should also have id i think
    await db.meme.create({
      data: {
        name,
        description,
        url,
        fileUrl: fileDataCloudinary.secure_url,
        screenshotUrl: screenshotDataCloudinary,
        lat: latlng.lat,
        lng: latlng.lng,
        verified,
        status,
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
