import BookingView from "@/modules/booking/views/BookingView";

const BookingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);
  return (
    <>
      <BookingView />
    </>
  );
};

export default BookingPage;
