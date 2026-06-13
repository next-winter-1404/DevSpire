import LocManagementDetailView from "@/modules/dashboard/AdminDashboard/LocManagementDetail/views/LocManagementDetailView";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <LocManagementDetailView params={params} />
    </>
  );
};

export default page;
