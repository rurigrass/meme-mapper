export default function GameLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      {/* <section className="py-4"> */}
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </div>
  );
}
