import { X, CalendarDays, User2, Mail, Phone, AlertCircle } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FormatDate } from "@/utils/helper/FormatDate";
import { useReservation } from "../services/hooks/useReservation";
import { TReservationStatus } from "@/components/common/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

export default function ReservationDetailsModal({
  isOpen,
  onClose,
  id,
}: Props) {
  const { reserveDetails, isPending, error } = useReservation(id);

  if (!isOpen) return null;

  const startDate = reserveDetails?.booking.reservedDates?.[0];
  const endDate = reserveDetails?.booking.reservedDates?.[1];

  const hasData = !!reserveDetails;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="
            w-full max-w-lg
            bg-white dark:bg-[#1f2937]
            rounded-2xl shadow-2xl
            text-gray-800 dark:text-gray-100
            animate-scaleIn overflow-hidden
          "
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">
              {isPending ? <Skeleton width={120} /> : "جزئیات رزرو"}
            </h2>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-5">
            {isPending ? (
              <Skeleton count={6} height={20} />
            ) : error || !hasData ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                  <AlertCircle className="w-7 h-7 text-red-500 dark:text-red-400" />
                </div>

                <h3 className="text-base font-semibold mb-2">
                  اطلاعات رزرو دریافت نشد
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-6">
                  دریافت جزئیات این رزرو با مشکل مواجه شد. لطفاً دوباره تلاش
                  کنید.
                </p>
              </div>
            ) : (
              <div className="space-y-6 text-sm">
                <div className="flex gap-3">
                  <CalendarDays className="w-5 h-5 text-gray-500 dark:text-gray-400" />

                  <div>
                    <div className="text-gray-600 dark:text-gray-300 mb-1">
                      تاریخ رزرو
                    </div>

                    <div className="font-medium">
                      {startDate && endDate
                        ? `${FormatDate(startDate, "fa")} تا ${FormatDate(endDate, "fa")}`
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <User2 className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />

                  <div className="w-full">
                    <div className="text-gray-600 dark:text-gray-300 mb-2">
                      مسافران
                    </div>

                    <div className="space-y-2 h-[170px] overflow-y-auto scroll-smooth">
                      {reserveDetails.booking.traveler_details?.length ? (
                        reserveDetails.booking.traveler_details.map(
                          (traveler, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 dark:border-gray-700 
                              rounded-lg p-3"
                            >
                              <div className="font-medium">
                                {traveler.firstName} {traveler.lastName}
                              </div>

                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                کد ملی: {traveler.nationalId || "-"}
                              </div>

                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                تاریخ تولد:
                                {traveler.birthDate
                                  ? FormatDate(traveler.birthDate, "fa")
                                  : "-"}
                              </div>
                            </div>
                          ),
                        )
                      ) : (
                        <div className="text-gray-500">مسافری ثبت نشده</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />

                  <div>
                    <div className="text-gray-600 dark:text-gray-300">
                      ایمیل
                    </div>

                    <div className="font-medium">
                      {reserveDetails.booking.sharedEmail || "-"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />

                  <div>
                    <div className="text-gray-600 dark:text-gray-300">
                      شماره موبایل
                    </div>

                    <div className="font-medium">
                      {reserveDetails.booking.sharedMobile || "-"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="text-gray-600 dark:text-gray-300">
                    وضعیت رزرو:
                  </span>

                  <StatusBadge status={reserveDetails.booking.status} />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 border-t border-gray-200 dark:border-gray-700 p-4">
            <button
              onClick={onClose}
              className="
                px-5 py-2 rounded-lg text-sm font-medium
                bg-gray-100 dark:bg-gray-800
                hover:bg-gray-200 dark:hover:bg-gray-700
                transition
              "
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  let label = "نامشخص";
  let colorClasses = "bg-gray-100 text-gray-700";

  if (status === "confirmed") {
    label = "تایید شده";
    colorClasses = "bg-teal-100 text-teal-700";
  } else if (status === "pending") {
    label = "در انتظار تایید";
    colorClasses = "bg-amber-100 text-amber-600";
  } else {
    label = "لغو شده";
    colorClasses = "bg-red-100 text-red-500";
  }

  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-medium inline-block ${colorClasses}`}
    >
      {label}
    </span>
  );
}
