import CategoryDetailView from "@/modules/dashboard/AdminDashboard/CategoryDetail/views/CategoryDetailView";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div>
      <CategoryDetailView params={params} />
    </div>
  );
};

export default page;
