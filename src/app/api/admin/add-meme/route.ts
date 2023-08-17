import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MemeValidator } from "@/lib/validators/meme";
import { z } from "zod";

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorised", { status: 401 });
  }

  try {
    const data = await req.formData();

    // Your validation and other logic here
    const { name, url, video } = MemeValidator.parse({
      name: data.get("name") as string,
      url: data.get("url") as string,
      video: data.get("file") as File,
    });
    console.log("THE DATA IS AWESONE ", name, url, video);

    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "test-mememapper-unsigned");
    formData.append("api_key", process.env.CLOUDINARY_SECRET);

    console.log(formData);

    if (typeof video === "undefined") {
      return new Response("Video file does not exist", { status: 400 });
    }

    const results = await fetch(
      "https://api.cloudinary.com/v1_1/dexcxs4gk/auto/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    console.log(results);

    // const { name, url, video } = await req.json();
    // console.log("JSON VIDEO ", name, url, video);

    // const formData = await video.formData();
    // console.log("THE REQUEST ", formData.get("video"));

    //converts the request to json
    // const body = await req.json();
    // // validated the json and destructures it.
    // const { name, url } = MemeValidator.parse(body);
    // const formData = await req.formData();
    // const video = formData.get("video");
    // console.log("DA FORM DATA: ", formData);

    // const formData = await req.formData();
    // const name = formData.get("name");
    // const url = formData.get("url");
    // const video: File | null = formData.get("video") as unknown as File;
    // console.log("DA API ROUTE: ", name, url);
    // console.log("DA FORM DATA: ", video); // Log the video to verify the file data

    //NO VIDEO = FAIL / not sure if the status code is right
    // if (!video) {
    //   return new Response("Video file does not exist", { status: 400 });
    // }

    // //Check if meme exists already / TODO: need to make string lowercase and no gaps etc
    // const memeNameExists = await db.meme.findFirst({
    //   where: {
    //     name,
    //   },
    // });

    // if (memeNameExists) {
    //   return new Response("This Meme already exists", { status: 409 });
    // }

    // //Push the meme to the DB - session.user should also have id i think
    // await db.meme.create({
    //   data: {
    //     name,
    //     url,

    //     creatorId: session.user.id,
    //   },
    // });

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
