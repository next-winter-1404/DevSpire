import { Star } from "lucide-react";
import Image from "next/image";

type Tprops = {
  title: string;
  location: string;
  rating: string | null;
};
const DetailTitle = ({ title, location, rating }: Tprops) => {
  return (
    <div className="w-full flex flex-col items-start gap-3">
      <h2 className="text-foreground text-[32px] font-bold">{title}</h2>
      {rating ? (
        <div className="flex items-center gap-1 rounded-full">
          {[5, 4, 3, 2, 1].map((star) => (
            <Star
              key={star}
              size={16}
              className={
                star <= parseInt(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-1  rounded-full">
          {[5, 4, 3, 2, 1].map((star) => (
            <Star key={star} size={16} className={"text-gray-300"} />
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 mt-1">
        <Image
          src="/icons/fastReservePage/location2.png"
          alt="location"
          width={17}
          height={17}
          className="hidden md:block"
        />
        <p className="text-[#777777] text-[16px]">{location}</p>
      </div>
    </div>
  );
};

export default DetailTitle;
