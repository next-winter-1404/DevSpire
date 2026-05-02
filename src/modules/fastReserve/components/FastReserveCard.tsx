import Image from "next/image";
import { IReserveCard } from "../types";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
type props = {
  className?: string;
  property: IReserveCard;
};

const FastReserveCard = ({ property, className }: props) => {
  const t = useTranslations("fastReserve");
  return (
    <div
      className={` ${className} flex flex-col bg-[#FFFFFF] dark:bg-[#27272A] rounded-2xl overflow-hidden 
       shadow hover:shadow-lg transition-shadow`}
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

      <div className="px-8 pb-6 pt-5 flex flex-col gap-3  ">
        <div className=" flex flex-wrap items-center gap-4 text-[20px] font-bold">
          {property.oldPrice && (
            <span className=" flex justify-start items-center gap-2 text-[#777777] line-through decoration-1">
              {property.oldPrice.toLocaleString()}
              <span>{t("toman")}</span>
            </span>
          )}
          <span className=" flex justify-start items-center gap-2  text-[#1E2022] dark:text-[#FAFAFA]">
            {property.price.toLocaleString()}
            <span>{t("toman")}</span>
          </span>
        </div>

        <div className="flex flex-col justify-start items-start gap-3">
          <Link
            href={`/fast-reserve/${property.id}`}
            className="font-bold text-[20px] hover:text-[#0D3B66] transition transition-colors duration-200
             text-[#1E2022] dark:text-[#FAFAFA] cursor-pointer "
          >
            {property.title}
          </Link>
          <div className="flex items-center text-[#777777] text-[16px] gap-2">
            <Image
              src="/icons/fastReservePage/location.png"
              alt="location"
              width={20}
              height={20}
            />
            <span>{property.location}</span>
          </div>
        </div>

        <hr className="border-[#DDDDDD] dark:border-[#3F3F46] my-2" />

        <div
          className="flex flex-wrap items-center
         gap-y-3 gap-x-6
       text-[#777777]
       text-[16px]
         lg:flex-nowrap lg:justify-between"
        >
          <div className="flex items-center gap-1">
            <Image
              src="/icons/fastReservePage/car.png"
              alt="car"
              width={20}
              height={20}
            />
            <span>
              {property.parking} {t("parking")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/fastReservePage/customers.png"
              alt="customers"
              width={20}
              height={20}
            />
            <span>
              {property.guests} {t("person")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/fastReservePage/bath.png"
              alt="bath"
              width={20}
              height={20}
            />
            <span>
              {property.bathrooms} {t("bath")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/fastReservePage/bed.png"
              alt="bed"
              width={20}
              height={20}
            />
            <span>
              {property.bedrooms} {t("sleep")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastReserveCard;
