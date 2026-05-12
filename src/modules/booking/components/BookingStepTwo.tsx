"use client";
import { useFieldArray, useForm } from "react-hook-form";
import HotelSummeryCard from "./HotelSummeryCard";
import { IFormProps, TBookingRequest } from "@/modules/booking/types";
import PassengerFormCard from "./PassengerFormCard";
import SharedBookingCard from "./SharedBookingCard";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { notFound } from "next/navigation";
import { THouse } from "@/components/common/types";
import { Link } from "@/i18n/routing";

interface IProps {
  changeTab: (tab: number) => void;
  house: THouse | null;
  getBookingData: (data: TBookingRequest) => void;
  houseId: number;
  getTotalPrice: (price: number) => void;
}
const BookingStepTwo = ({
  house,
  changeTab,
  getBookingData,
  houseId,
  getTotalPrice,
}: IProps) => {
  const bookingData = useSelector((state: RootState) => state.booking);
  if (
    bookingData.exitDate == null ||
    bookingData.insertDate == null ||
    bookingData.travelersCount == 0
  ) {
    notFound();
  }

  const insertDate = bookingData.insertDate;
  const exitDate = bookingData.exitDate;
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProps>({
    defaultValues: {
      traveler_details: Array.from(
        { length: bookingData.travelersCount },
        () => ({
          firstName: "",
          lastName: "",
          nationalId: "",
          gender: "male",
          birthDate: "",
        }),
      ),
    },
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: "traveler_details",
  });
  if (!house) {
    return (
      <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
        <div className="mb-4 text-6xl">🏠</div>

        <h3 className="mb-2 text-xl font-bold text-gray-800">
          خانه‌ای با این شناسه پیدا نشد
        </h3>

        <p className="mb-6 max-w-md text-sm leading-7 text-gray-500">
          در حال حاضر موردی برای نمایش وجود ندارد
        </p>

        <Link
          href="/fast-reserve"
          className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          انتخاب مجدد
        </Link>
      </div>
    );
  }
  const basePrice = house.discounted_price
    ? parseInt(house.discounted_price)
    : parseInt(house?.price);
  const totalPrice = basePrice * fields.length;

  const onSubmit = (data: IFormProps) => {
    console.log(data);
    getBookingData({
      houseId,
      reservedDates: [insertDate, exitDate],
      traveler_details: data.traveler_details,
      sharedEmail: data.sharedEmail,
      sharedMobile: data.sharedMobile,
    });
    getTotalPrice(totalPrice);
    toast.success("اطلاعات شما با موفقیت ثبت شد");
    changeTab(3);
  };

  return (
    <div className="w-full ">
      <div className="w-full mb-8">
        <HotelSummeryCard
          insertDate={bookingData.insertDate}
          exitDate={bookingData.exitDate}
          house={house}
        />
      </div>
      <form
        className=" w-full flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <PassengerFormCard
          control={control}
          register={register}
          fields={fields}
          append={append}
          remove={remove}
          errors={errors}
        />
        <SharedBookingCard register={register} errors={errors} />
        <div className=" w-full flex flex-col gap-4 md:gap-2">
          <div className="flex gap-2 items-center">
            <h2 className="text-[24px] font-bold text-foreground ">
              قیمت کل :
            </h2>
            <h2 className="text-primary text-[24px] font-bold ">
              {totalPrice.toLocaleString()} تومان
            </h2>
          </div>
          <div className="w-full flex items-start justify-end">
            <button
              type="submit"
              className="text-[#ffff] text-[20px] bg-primary  p-2.5 cursor-pointer rounded-[16px] "
            >
              تایید و ادامه فرایند
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingStepTwo;
