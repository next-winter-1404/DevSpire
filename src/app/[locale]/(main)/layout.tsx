import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="pt-8 px-4 sm:px-6 sm:pt-6 lg:px-12">
        <Header />
      </header>
      <main>{children}</main>
      <footer className="pt-10 pb-8 px-4 sm:py-6 sm:px-6 lg:px-12">
        <Footer />
      </footer>
    </>
  );
}
