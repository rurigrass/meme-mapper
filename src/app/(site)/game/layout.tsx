// import { getAuthSession } from "@/lib/auth";
// import { db } from "@/lib/db";

// const Page = async () => {
//   const session = await getAuthSession();

//   const user = await db.user.findFirst({
//     where: {
//       id: session?.user.id,
//     },
//   });

//   return (
//     <div className="pt-20">
//       page
//       {/* <pre>{JSON.stringify(session)}</pre> */}
//     </div>
//   );
// };

// export default Page;

export default function GameLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full lg:mb-1.5 lg:mr-1.5">
      {/* <section className="py-4"> */}
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </div>
  );
}
