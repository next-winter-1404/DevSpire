import { apiFetch } from "@/core/Server-fetch/fetchApi";
import RentVillaTop from "./RentVillaTop";
import RentVillaCard from "./RentVillaCard";


const RentVilla = async () => {

  const data = await apiFetch("/houses", {
    params: {
      limit: 5,
    },
    next: {
      revalidate: 60,
    },
  });

  return (
    <div className="mt-30 px-4 sm:px-6 lg:px-10 w-full">
      <div className="flex flex-col gap-10">
        <RentVillaTop/>
        <div className="flex flex-row flex-wrap justify-start gap-12 w-full">
          {
            data.houses?.slice(0,5).map((item: any) => (
              <RentVillaCard key={item.id} item={item}/>
            ))
          }
        </div>       
      </div>
    </div>
  );
};

export default RentVilla;
