import { Edit } from "lucide-react";
import { TravelersDetailMock } from "../mock";
import TravelersDataTable from "./TravelersDataTable";

const BookingStepThree = () => {
  return (
    <div className="w-full">
      <div className="w-full bg-[#FFFFFF] rounded-[24px] border border-[#DDDDDD] p-6 dark:bg-[#27272A] mb-8 ">
        <div className="w-full flex items-center justify-between mb-8">
          <h2 className="text-[24px] font-bold text-foreground ">
            مشخصات مسافران
          </h2>
          <button className="flex items-center gap-2 text-primary text-[16px]">
            <Edit size={20} />
            ویرایش مسافران
          </button>
        </div>
        <TravelersDataTable
          basePrice={2_000_000}
          traveler_details={TravelersDetailMock}
        />
      </div>
      <div className="w-full bg-[#FFFFFF] rounded-[24px] border border-[#DDDDDD] p-6 dark:bg-[#27272A]">
        <div className="flex flex-col  md:flex-row md:items-center gap-2 mb-8 ">
          <h2 className="text-[24px] text-foreground font-bold ">
            اطلاع رسانی سفر
          </h2>
          <p className=" text-[16px] text-[#777777] font-medium ">{`( اطلاعات بلیط و اطلاع رسانی بعدی به این آدرس ارسال می شود )`}</p>
        </div>
        <div className="flex flex-col md:flex-row md:flex-start md:items-center gap-16 ">
          <div className="flex flex-col gap-2 items-start  ">
            <label className="text-[16px] text-foreground font-bold">
              شماره تلفن
            </label>
            <p className="text-[#777777] text-[16px] ">09391234567</p>
          </div>
          <div className="flex flex-col gap-2 items-start  ">
            <label className="text-[16px] text-foreground font-bold">
              ایمیل
            </label>
            <p className="text-[#777777] text-[16px] ">example@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStepThree;
