import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body.data;
    console.log(username);

    //ADD THIS LATER - CHECK IF ALREADY LOGGED IN
    // const session = await getAuthSession();
    // if (session?.user) {
    //   return new Response("Already logged in", { status: 200 });
    // }

    // CHECK REQUEST IS VALID - could add zod validation here
    if (!username || !email || !password) {
      return new Response("Missing name, email, or passord", { status: 400 });
    }

    //CHECK EMAIL EXISTS
    const emailExists = await db.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      return new Response("Email already exists", { status: 409 });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("HELLO");

    //CREATE THE USER
    const user = await db.user.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    });

    console.log("USER", user);

    return new Response(JSON.stringify(user));
  } catch (error) {
    console.log(error);

    return new Response("Could not add user", { status: 500 });
  }
}
