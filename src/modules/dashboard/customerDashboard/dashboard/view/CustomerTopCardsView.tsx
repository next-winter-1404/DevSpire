import { apiFetch } from "@/core/Server-fetch/fetchApi";
import CustomerDashboardTopCards from "../components/CustomerDashboardTopCards";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { TReservationsResponse } from "@/components/common/types";
import { IPaymentResponse } from "../../payments/types";
import { IDecodedToken } from "@/modules/main/fastReserveDetail/types";
import { IFavoritesResponse } from "../../favorites/types";

const CustomerTopCardsView = async () => {
  const payments = await apiFetch<IPaymentResponse | null>("/payments", {
    params: {
      status: "pending",
    },
    next: {
      revalidate: 60,
    },
  });

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value as string;
  const decoded = jwtDecode<IDecodedToken>(token);

  const favs = await apiFetch<IFavoritesResponse | null>(
    `/favorites/user/${decoded.id}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  const allOfReserves = await apiFetch<TReservationsResponse | null>(
    "/bookings",
    {
      next: {
        revalidate: 60,
      },
    },
  );
  const completedReserves = allOfReserves?.data.filter(
    (item) => item.status == "confirmed",
  );

  return (
    <>
      <CustomerDashboardTopCards
        payments={payments?.totalCount}
        favorites={favs?.totalCount}
        allReserves={allOfReserves?.totalCount}
        activeReserves={completedReserves?.length}
      />
    </>
  );
};

export default CustomerTopCardsView;
