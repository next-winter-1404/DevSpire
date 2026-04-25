import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 container">
        {children}
      </main>
      <Footer />
    </>
  );
}
