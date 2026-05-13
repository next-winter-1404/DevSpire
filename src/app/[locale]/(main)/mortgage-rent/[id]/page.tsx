import MortgageRentDetailView from "@/modules/mortgageRentDetail/views/MortgageRentDetailView";

const MortgageRentDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log("id : ", id);
  return (
    <>
      <MortgageRentDetailView/>
    </>
  );
};

export default MortgageRentDetail;
