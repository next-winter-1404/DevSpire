import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import BlogsView from "@/modules/dashboard/AdminDashboard/blogs/views/BlogsView";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}
const BlogsManagement = async ({ searchParams }: IProps) => {
  const sparams = await searchParams;

  const params = {
    sort: sparams.sort ?? "",
    order: sparams.order ?? "",
    limit: sparams.limit ?? "",
    page: sparams.page ?? "",
  } as Record<string, string>;
  return (
    <Suspense fallback={<DashboardTableSkeleton />}>
      <DashboardContainer>
        <>
          <BlogsView params={params} />
        </>
      </DashboardContainer>
    </Suspense>
  );
};

export default BlogsManagement;
