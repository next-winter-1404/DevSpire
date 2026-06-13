"use client";
import { TUserHouseResponse } from "@/components/common/types";
import httpClient from "@/core/interceptor/axios";
import { usePathname, useRouter } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SellerChooseHouseModal = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data: houses, isPending } = useQuery({
    queryKey: ["SELLERSHOUSES"],
    queryFn: async () =>
      (await httpClient("/houses/seller/user")).data as TUserHouseResponse,
  });

  const [selectedId, setSelectedId] = useState(
    searchParams.get("house_id") ?? "",
  );

  if (!isOpen) return null;

  const handleAction = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set("house_id", id);
    else params.delete("house_id");

    router.push(`${pathname}?${params.toString()}`);
    setSelectedId(id ?? "");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl flex flex-col max-h-[80vh]">
        <h1 className="text-xl font-bold mb-6 text-center">
          انتخاب ملک برای نمایش
        </h1>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {isPending ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} height={16} width={120} />
            ))
          ) : houses?.houses.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              هیچ ملکی یافت نشد.
            </p>
          ) : (
            houses?.houses.map((item) => {
              const isSelected = selectedId === String(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => handleAction(String(item.id))}
                  className={`flex items-center gap-4 p-2 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-gray-50 border-transparent"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0 bg-gray-200">
                    {item.photos?.[10] && (
                      <Image
                        src={item.photos[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <span
                    className={`font-medium ${isSelected ? "text-primary" : "text-gray-700"}`}
                  >
                    {item.title}
                  </span>
                  <span className="text-sm">{`(${
                    item.transaction_type == "reservation"
                      ? "رزرو"
                      : item.transaction_type == "rental"
                        ? "اجاره"
                        : item.transaction_type == "mortgage"
                          ? "رهن"
                          : "خرید و فروش"
                  })`}</span>
                  {isSelected && <div className="ml-auto text-primary">✓</div>}
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center gap-2 mt-4 pt-4 justify-center border-t">
          <button
            onClick={() => handleAction(null)}
            className=" py-2 px-4 rounded-xl bg-red-200 text-red-500
             hover:text-red-700 transition-colors"
          >
            حذف انتخاب فعلی
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2  rounded-xl border border-[#777777] "
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
