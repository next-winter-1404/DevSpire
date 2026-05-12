import { THouse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import BookingView from "@/modules/booking/views/BookingView";
import { notFound } from "next/navigation";

const BookingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const param = parseInt(id);
  if (!param) {
    notFound();
  }
  const data = await apiFetch<THouse | null>(`/houses/${param}`, {
    next: { revalidate: 60 * 2 },
  });
  return (
    <>
      <BookingView houseId={param} house={data} />
    </>
  );
};

export default BookingPage;
