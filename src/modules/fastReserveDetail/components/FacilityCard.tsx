import { IFacility } from "../types";

export function FacilityCard({ facility }: { facility: IFacility }) {
  return (
    <div
      className="w-full bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px] p-4 hover:shadow-md transition-shadow
     flex items-center gap-3"
    >
      <div className="w-12 h-12 bg-[#F5F5F5] rounded-lg flex items-center justify-center text-2xl">
        {facility.icon}
      </div>
      <span className="text-[#0D3B66] font-bold text-[16px]">
        {facility.name}
      </span>
    </div>
  );
}
