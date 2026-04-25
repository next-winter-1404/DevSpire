import Image from "next/image";
import { IReserveCard } from "../types";

type props = {
  className?: string;
  property: IReserveCard;
};

const FastReserveCard = ({ property, className }: props) => {
  return (
    <div
      className={` ${className} flex flex-col bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#DDDDDD]
     shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="relative h-60 w-full">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover"
        />
        {property.discount && (
          <div className="absolute top-3 left-3 bg-[#FF5555] text-white rounded-full text-[16px] p-3">
            {property.discount}٪
          </div>
        )}
      </div>

      <div className="px-8 py-6 flex flex-col gap-3">
        <div className=" flex items-center gap-4 text-[20px] font-bold">
          {property.oldPrice && (
            <span className=" flex justify-start items-center gap-2 text-[#777777] line-through">
              {property.oldPrice.toLocaleString()}
              <span className="text-[#777777]">تومان</span>
            </span>
          )}
          <span className=" flex justify-start items-center gap-2  text-[#1E2022]">
            {property.price.toLocaleString()}
            <span className=" text-[#777777]">تومان</span>
          </span>
        </div>

        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="font-bold text-[20px] text-[#1E2022]">
            {property.title}
          </h3>
          <div className="flex items-center text-[#777777] text-[16px] gap-1">
            <span>{property.location}</span>
            <img
              src="/icons/fastReservePage/location.png"
              alt="location"
              className="w-4 h-4"
            />
          </div>
        </div>

        <hr className="border-[#DDDDDD] my-2" />

        <div className="flex items-center justify-between text-[#777777] text-[16px]">
          <div className="flex items-center gap-1">
            <img
              src="/icons/fastReservePage/car.png"
              alt="car"
              className="w-5 h-5"
            />
            <span>{property.parking} پارکینگ</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src="/icons/fastReservePage/customers.png"
              alt="customers"
              className="w-5 h-5"
            />
            <span>{property.guests} نفر</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src="/icons/fastReservePage/bath.png"
              alt="bath"
              className="w-5 h-5"
            />
            <span>{property.bathrooms} حمام</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src="/icons/fastReservePage/bed.png"
              alt="bed"
              className="w-5 h-5"
            />
            <span>{property.bedrooms} خواب</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastReserveCard;
