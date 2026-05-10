import { apiFetch } from "@/core/Server-fetch/fetchApi";
import FastReserveDetailView from "@/modules/fastReserveDetail/views/FastReserveDetailView";
import { notFound } from "next/navigation";

const FastReserveDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  // const param = parseInt(id);
  // if (!param) {
  //   notFound();
  // }
  // const data = await apiFetch(`/houses/${param}`);
  return (
    <>
      <FastReserveDetailView />
    </>
  );
};

export default FastReserveDetail;
