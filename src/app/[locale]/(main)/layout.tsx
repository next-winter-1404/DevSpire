import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="px-4 sm:px-6 lg:px-12 pt-8 sm:pt-6">
        <Header />
      </header>
      <main>{children}</main>
      <footer className="px-4 sm:px-6 lg:px-12 pb-8 pt-10 sm:py-6">
        <Footer />
      </footer>
    </>
  );
}
