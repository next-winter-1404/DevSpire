import FavoritesView from "@/modules/customerDashboard/favorites/views/FavoritesView";
import React from "react";

const FavoritesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | null }>;
}) => {
  const sparams = await searchParams;
  const params = {
    sort: sparams.sort ?? "",
    order: sparams.order ?? "",
    limit: sparams.limit ?? "",
    page: sparams.page ?? "",
  } as Record<string, string>;
  return (
    <>
      <FavoritesView params={params} />
    </>
  );
};

export default FavoritesPage;
