export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-4">
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </section>
  );
}
