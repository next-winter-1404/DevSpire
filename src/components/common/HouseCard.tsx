import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { THouse } from "./types";
import { getDiscount } from "@/utils/helper/getDiscount";
import Image from "next/image";

type props = {
  className?: string;
  property: THouse;
  transactionType: "rental" | "mortgage" | "reservation" | "direct_purchase";
};

const HouseCard = ({ property, className, transactionType }: props) => {
  const t = useTranslations("fastReserve");
  return (
    <div
      className={` ${className} flex flex-col bg-[#FFFFFF] dark:bg-[#27272A] rounded-2xl overflow-hidden 
       shadow hover:shadow-lg transition-shadow  border border-[#DDDDDD] dark:border-0 `}
    >
      <div className="relative h-60 w-full">
        <Image
          src={"/images/fastReservePage/house1.png"}
          alt={property.title}
          fill
          className="object-cover"
        />
        {property.discounted_price && (
          <div className="absolute top-3 left-3 bg-[#FF5555] text-white rounded-full text-[16px] w-13 h-13 flex items-center justify-center">
            {getDiscount(
              parseInt(property.price),
              parseInt(property.discounted_price),
            ).toFixed(0)}
            ٪ -
          </div>
        )}
      </div>

      <div className="px-8 pb-6 pt-5 flex flex-col gap-3  ">
        <div className=" flex flex-wrap items-center gap-4 text-[20px] font-bold">
          {property.discounted_price && (
            <>
              <span className=" flex justify-start items-center gap-2 text-[#777777] line-through decoration-1">
                {parseInt(property.price).toLocaleString()}
                <span>{t("toman")}</span>
              </span>
              <span className=" flex justify-start items-center gap-2  text-[#1E2022] dark:text-[#FAFAFA]">
                {parseInt(property.discounted_price).toLocaleString()}
                <span>{t("toman")}</span>
              </span>
            </>
          )}
          {!property.discounted_price && (
            <span className=" flex justify-start items-center gap-2  text-[#1E2022] dark:text-[#FAFAFA]">
              {parseInt(property.price).toLocaleString()}
              <span>{t("toman")}</span>
            </span>
          )}
        </div>

        <div className="flex flex-col justify-start items-start gap-3">
          <Link
            href={
              property.transaction_type == "reservation"
                ? `/fast-reserve/${property.id}`
                : `/mortgage-rent/${property.id}`
            }
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
              {property.capacity} {t("person")}
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
              {property.rooms} {t("sleep")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
