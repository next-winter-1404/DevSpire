import LocManagementDetailView from "@/modules/AdminDashboard/LocManagementDetail/views/LocManagementDetailView";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <LocManagementDetailView params={params} />
    </>
  );
};

export default page;
