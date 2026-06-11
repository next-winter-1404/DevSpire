import { TLocation } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import LocationProperties from "../components/LocationProperties";
import { Link } from "@/i18n/routing";
import DashboardContainer from "@/components/dashboard/DashboardContainer";

interface IProps {
  params: Promise<{ id: string }>;
}

const LocManagementDetailView = async ({ params }: IProps) => {
  const { id } = await params;
  const param = parseInt(id);
  const data = await apiFetch<TLocation | null>(`/locations/${param}`, {
    cache: "no-store",
  });

  return (
    <DashboardContainer>
      <div className="flex flex-col gap-8 h-full">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
            {data?.areaName ? data?.areaName : "فاقد نام"}
          </h1>
          <Link
            href={"/dashboard/admin/locations-management"}
            className="text-primary cursor-pointer"
          >
            لیست املاک
          </Link>
        </div>
        <div className="h-full">
          <LocationProperties location={data} id={data?.id ?? 0} />
        </div>
      </div>
    </DashboardContainer>
  );
};

export default LocManagementDetailView;
