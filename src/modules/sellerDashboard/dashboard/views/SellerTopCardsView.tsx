import { IDashboardStats } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import SellerTopCard from "../components/SellerTopCard";

const SellerTopCardsView = async () => {
  const stats = await apiFetch<IDashboardStats | null>("/dashboard/summary");
  return (
    <>
      <SellerTopCard stats={stats} />
    </>
  );
};

export default SellerTopCardsView;
