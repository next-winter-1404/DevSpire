import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import { cookies } from "next/headers";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return (
    <>
      <header>
        <Header token={token} />
      </header>
      <main className="pt-[60px]">{children}</main>
      <footer className="pt-10 pb-8 px-4 sm:py-6 sm:px-6 lg:px-12">
        <Footer />
      </footer>
    </>
  );
}
