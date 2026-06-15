import { apiFetch } from "@/core/Server-fetch/fetchApi";
import PaymentsFilters from "../components/PaymentsFilters";
import { IPaymentResponse } from "../types";
import PaymentsList from "../components/PaymentsList";

const PaymentsView = async ({ params }: { params: Record<string, string> }) => {
  const res = await apiFetch<IPaymentResponse | null>("/payments", {
    params,
    cache: "no-store",
  });

  return (
    <div className="h-full">
      <div
        className=" w-full flex flex-col md:flex-row justify-between
       items-center mb-4 gap-4"
      >
        <h1 className="text-xl font-bold text-foreground">
          لیست تراکنش های شما
        </h1>

        <div className=" w-full md:w-[50%]">
          <PaymentsFilters />
        </div>
      </div>
      <div
        className="h-[90%]  border-[#DDDDDD] 
      rounded-[24px] overflow-hidden  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626]"
      >
        {res && res?.totalCount > 0 ? (
          <PaymentsList role="buyer" buyerData={res} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center px-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              هنوز پرداختی از طرف شما ثبت نشده است
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsView;
