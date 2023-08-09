import { authOptions, getAuthSession } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  // const session = getAuthSession();
  const session = await getServerSession(authOptions);

  return (
    <main className="">
      <h1>home</h1>
      <pre>{JSON.stringify(session)}</pre>
    </main>
  );
}
