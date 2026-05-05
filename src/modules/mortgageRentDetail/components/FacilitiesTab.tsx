import { IFacility } from "../types";
import { FacilityCard } from "./FacilityCard";

interface FacilitiesTabProps {
  facilities: IFacility[];
}

export default function FacilitiesTab({ facilities }: FacilitiesTabProps) {
  return (
    <div className="w-full flex flex-wrap gap-5  ">
      {facilities.map((facility) => (
        <div className="md:w-[23%] w-[45%] " key={facility.id}>
          <FacilityCard facility={facility} />
        </div>
      ))}
    </div>
  );
}
