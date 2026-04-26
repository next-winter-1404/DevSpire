import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-5  ">
        <Header />
      </header>
      <main className="px-4 sm:px-6 lg:px-10 py-8 sm:py-5 lg:py-10 container">
        {children}
      </main>
      <footer className="px-4 sm:px-6 lg:px-10 py-8 sm:py-5 ">
        <Footer />
      </footer>
    </>
  );
}
