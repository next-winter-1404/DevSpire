import FastReserveDetailView from "@/modules/fastReserveDetail/views/FastReserveDetailView";

const FastReserveDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log("id : ", id);
  return (
    <>
      <FastReserveDetailView />
    </>
  );
};

export default FastReserveDetail;
