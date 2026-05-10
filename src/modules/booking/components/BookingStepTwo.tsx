import { useFieldArray, useForm } from "react-hook-form";
import HotelSummeryCard from "./HotelSummeryCard";
import { IFormProps } from "@/modules/booking/types";
import PassengerFormCard from "./PassengerFormCard";
import SharedBookingCard from "./SharedBookingCard";
import toast from "react-hot-toast";

const BookingStepTwo = () => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProps>({
    defaultValues: {
      traveler_details: [
        {
          firstName: "",
          lastName: "",
          nationalId: "",
          gender: "male",
          birthDate: "",
        },
      ],
    },
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: "traveler_details",
  });

  const onSubmit = (data: IFormProps) => {
    console.log(data);
    toast.success("submitted");
  };
  const basePrice = 2_500_000;
  const totalPrice = basePrice * fields.length;
  return (
    <div className="w-full ">
      <div className="w-full mb-8">
        <HotelSummeryCard />
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
