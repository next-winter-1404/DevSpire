import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import SocialBookmarksView from "@/modules/dashboard/customerDashboard/SocialBookMarks/views/SocialBookMarksView";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}

const page = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const payLoad = {
    page: params.page ?? "1",
    limit: params.limit ?? "5",
    sort: params.sort ?? "",
    order: params.order ?? "DESC",
    houseId: params.houseId ?? "",
    note: params.note ?? "",
  } as Record<string, string>;

  return (
    <DashboardContainer>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <SocialBookmarksView params={payLoad} />
      </Suspense>
    </DashboardContainer>
  );
};

export default page;
