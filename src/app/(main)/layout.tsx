export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 container">
        {children}
      </main>
    </>
  );
}
