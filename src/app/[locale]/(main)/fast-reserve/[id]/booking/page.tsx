import { THouse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import BookingView from "@/modules/main/booking/views/BookingView";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const BookingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const param = parseInt(id);
  if (!param) {
    notFound();
  }
  const data = await apiFetch<THouse | null>(`/houses/${param}`, {
    cache: "no-store",
  });

  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[80vh]">
            در حال بارگذاری...
          </div>
        }
      >
        <BookingView houseId={param} house={data} />
      </Suspense>
    </>
  );
};

export default BookingPage;
