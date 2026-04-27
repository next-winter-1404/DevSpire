import dynamic from "next/dynamic";
import FastReserveSideFilters from "../components/Filters";
import ReserveCardList from "../components/ReserveCardList";
import LeafletMapClientWrapper from "@/components/common/LeafletMapClientWrapper";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import { breadcrumbItemsMock } from "../mocks/data";
import Container from "@/components/common/Container";

const FastReserveView = () => {
  return (
    <Container>
      <div className="mb-8">
        <BreadCrumbs items={breadcrumbItemsMock} />
      </div>
      <div className=" w-full lg:w-[60%] flex items-center justify-between mb-8">
        <h2 className="text-[#1E2022] dark:text-[#FAFAFA] lg:text-[24px] font-bold ">
          فیلتر ها
        </h2>
        <span className="lg:text-[20px] text-[#0D3B66] ">16 نتیجه</span>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-start lg:justify-between  h-auto lg:h-[235px] mb-10 ">
        <div className=" w-full lg:w-[60%] h-full">
          <FastReserveSideFilters />
        </div>
        <div className=" w-full lg:w-[37%] h-[300px] lg:h-full mt-4 lg:mt-0 ">
          <LeafletMapClientWrapper />
        </div>
      </div>
      <div>
        <ReserveCardList />
      </div>
    </Container>
  );
};

export default FastReserveView;
