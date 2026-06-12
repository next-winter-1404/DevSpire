import { apiFetch } from "@/core/Server-fetch/fetchApi";
import SellerTopCard from "../components/SellerTopCard";
import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { ICommentResponse } from "../../payments/types";

export interface ISellerFinance {
  totalAmount: number;
  totalBookings: number;
  totalPayments: number;
  totalPerviousMonthAmount: number;
  totalCurrentMonthAmount: number;
}

interface IUserActivity {
  userId: number;
  bookingCount: number;
  feedbackGiven: number;
  feedbackReceived: number;
  housesCreated: number;
}

const SellerTopCardsView = async () => {
  const stats = await apiFetch<ISellerFinance | null>(
    "/seller/finance/dashboard",
  );
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value as string;
  const decoded = jwtDecode(token) as IDecodedToken;

  const comments = await apiFetch<ICommentResponse | null>(
    `/comments/seller/${decoded.id}`,
    { cache: "no-store" },
  );
  const userActivity = await apiFetch<IUserActivity | null>(
    `/user-activity/${decoded.id}`,
  );

  return (
    <>
      <SellerTopCard
        houses={userActivity?.housesCreated}
        commentsCount={comments?.totalCount}
        stats={stats}
      />
    </>
  );
};

export default SellerTopCardsView;
