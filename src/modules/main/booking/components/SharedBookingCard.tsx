"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
const SharedBookingCard = ({ register, errors }: any) => {
  return (
    <div className="w-full bg-[#FFFFFF] rounded-[24px] border border-[#DDDDDD] p-6 dark:bg-[#27272A]">
      <div className="flex flex-col  md:flex-row md:items-center gap-2 mb-6 ">
        <h2 className="text-[24px] text-foreground font-bold ">
          ارسال بلیط به دیگران
        </h2>
        <p className=" text-[16px] text-[#777777] font-medium ">{`( ارسال بلیط به ایمیل و شماره همراه دیگر )`}</p>
      </div>
      <div className="flex flex-col md:flex-row md:flex-start md:items-center gap-6 ">
        <div className="flex flex-col gap-2 items-start md:w-[24%] relative pb-6">
          <label className="text-[14px] text-foreground font-bold">
            شماره تلفن
          </label>
          <input
            type="text"
            {...register("sharedMobile", {
              pattern: {
                value: /^09\d{9}$/,
                message: "شماره موبایل باید ۱۱ رقم باشد و با 09 شروع شود",
              },
            })}
            className={`w-full   placeholder:text-[#777777] text-foreground bg-[#F5F5F5]
                     dark:bg-[#3F3F46] rounded-[40px] p-3.5 text-[14px] outline-none focus:ring-2 ${
                       errors?.sharedMobile
                         ? "border border-red-500 focus:ring-red-500"
                         : " focus:ring-blue-500"
                     }`}
            placeholder="09113334444"
          />
          {errors?.sharedMobile && (
            <span className="absolute bottom-0 text-[12px] text-red-500 font-medium">
              {errors.sharedMobile.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 items-start md:w-[24%] relative pb-6">
          <label className="text-[14px] text-foreground font-bold">ایمیل</label>
          <input
            type="text"
            {...register("sharedEmail", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "فرمت ایمیل نامعتبر است",
              },
            })}
            className={`w-full  placeholder:text-[#777777] text-foreground bg-[#F5F5F5]
                     dark:bg-[#3F3F46] rounded-[40px] p-3.5 text-[14px] outline-none focus:ring-2 ${
                       errors?.sharedEmail
                         ? "border border-red-500 focus:ring-red-500"
                         : " focus:ring-blue-500"
                     }`}
            placeholder={`example@gmail.com`}
          />
          {errors?.sharedEmail && (
            <span className="absolute bottom-0 text-[12px] text-red-500 font-medium">
              {errors.sharedEmail.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedBookingCard;
