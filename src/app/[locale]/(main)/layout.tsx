import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { TUserRes } from "@/modules/CustomerDashboard/Dashboard/components/CustomerDashboardCharts";
import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("accessToken")?.value as string;
  let decoded = null;
  let user = null;

  try {
    if (token) {
      decoded = jwtDecode(token) as IDecodedToken;
    }
  } catch (err) {
    return null;
  }
  if (decoded?.id) {
    user = await apiFetch<TUserRes | null>(`/users/${decoded?.id}`, {
      cache: "no-store",
    });
  }

  return (
    <>
      <header>
        <Header user={user} />
      </header>
      <main className="pt-[60px]">{children}</main>
      <footer className="pt-10 pb-8 px-4 sm:py-6 sm:px-6 lg:px-12">
        <Footer />
      </footer>
    </>
  );
}
