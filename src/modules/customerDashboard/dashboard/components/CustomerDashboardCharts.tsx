import CompleteProfile from "@/components/common/CompleteProfile";
import PaymentStatusChart from "./PaymentsStatusChart";
import { IPaymentResponse } from "../../Payments/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import { FormatDate } from "@/utils/helper/FormatDate";

type TUser = {
  id: number;
  role: string;
  membershipDate: null;
  email: string;
  phoneNumber: string;
  emailVerified: boolean;
  verificationCode: string;
  verificationCodeExpires: string;
  resetCode: string | null;
  resetCodeExpires: string | null;
  fullName: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  created_at: string;
  updated_at: string;
};

export interface TUserRes {
  user: TUser;
  additionalPercentage: number;
}
const CustomerDashboardCharts = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value as string;
  const decoded = jwtDecode(token) as IDecodedToken;

  const user = await apiFetch<TUserRes | null>(`/users/${decoded.id}`, {
    next: { revalidate: 60 },
  });

  const completedPaymentsRes = await apiFetch<IPaymentResponse | null>(
    "/payments",
    {
      params: { status: "completed" },
      next: {
        revalidate: 60,
      },
    },
  );
  const allPayments = await apiFetch<IPaymentResponse | null>("/payments", {
    next: {
      revalidate: 60,
    },
  });
  const paymentPercentage = (
    ((completedPaymentsRes?.totalCount || 0) / (allPayments?.totalCount || 0)) *
    100
  ).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch gap-4">
      <PaymentStatusChart percentage={parseInt(paymentPercentage)} />
      <CompleteProfile
        lastEditText={` آخرین ویرایش  ${FormatDate(user?.user.updated_at || "", "fa")}`}
        percentage={user?.additionalPercentage}
        linkHref="/seller-dashboard/edit-profile"
      />
    </div>
  );
};

export default CustomerDashboardCharts;
