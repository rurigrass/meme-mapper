import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

const Page = async () => {
  const session = await getAuthSession();

  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <div>
      page
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};

export default Page;
