import { THouse } from "@/components/common/types";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import EstateManageMentFormView from "@/modules/sellerDashboard/estatesManagement/Form/views/EstateManageMentFormView";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  
  const { id } = await params;
  const param = parseInt(id);
  const data = await apiFetch<THouse | null>(`/houses/${param}`, {
    cache: "no-store",
  });

  return (
    <DashboardContainer>
      <EstateManageMentFormView house={data} />
    </DashboardContainer>
  );
};

export default page;
