import { getAuthSession } from "@/lib/auth";

export default async function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <>
      {session?.user.role !== "ADMIN" ? (
        <div className="flex h-full justify-center items-center text-3xl mb-40">
          Only admins can access this page
        </div>
      ) : (
        <section className="py-4 h-full">{children}</section>
      )}
    </>
  );
}
