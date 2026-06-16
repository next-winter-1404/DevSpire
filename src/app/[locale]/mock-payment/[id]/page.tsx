import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { Link } from "@/i18n/routing";
import { IGetPayment } from "@/modules/main/booking/types";
import MockPaymentView from "@/modules/main/booking/views/MockPaymentView";

interface IProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | number | undefined }>;
}
const MockPayment = async ({ params, searchParams }: IProps) => {
  const { id } = await params;
  const paymentData: IGetPayment | null = await apiFetch(`/payments/${id}`);
  return (
    <div>
      {paymentData ? (
        <MockPaymentView paymentData={paymentData} />
      ) : (
        <div>
          <div
            className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-2xl 
          border border-dashed border-gray-300 bg-gray-50 px-6 text-center"
          >
            <h3 className="mb-2 text-xl font-bold text-gray-800">
              درگاهی پیدا نشد !
            </h3>
            <p className="mb-6 max-w-md text-sm leading-7 text-gray-500">
              درحال حاضر درگاهی با مشخصات شما برای پرداخت یافت نشد
            </p>
            <Link
              href="/"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockPayment;
