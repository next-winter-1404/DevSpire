import Image from "next/image";

const BookingCard = () => {
  return (
    <div
      className="w-full  rounded-2xl p-6 shadow-sm border border-[#dddd] dark:border-[#333333]
       bg-[#ffff]  dark:bg-[#27272A]"
    >
      <div className="flex flex-col gap-5 mb-6">
        <div>
          <label className="block text-[16px] font-bold text-[#1E2022] dark:text-[#FAFAFA] mb-3">
            تاریخ ورود
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="۱۴۰۴/۰۶/۱۰"
              className="w-full bg-gray-50 dark:bg-[#3F3F46]  border-none rounded-[24px] py-3 px-5 text-sm 
              focus:ring-2 focus:ring-blue-100 outline-none"
            />
            <Image
              src="/icons/fastReservePage/calendar.png"
              alt="Calendar"
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50"
              width={18}
              height={18}
            />
          </div>
        </div>

        <div>
          <label className="block text-[16px] font-bold text-[#1E2022] dark:text-[#FAFAFA] mb-3">
            تاریخ خروج
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="۱۴۰۴/۰۶/۱۵"
              className="w-full bg-gray-50 border-none rounded-[24px] py-3 px-5 text-sm focus:ring-2
               focus:ring-blue-100 outline-none dark:bg-[#3F3F46] "
            />
            <Image
              src="/icons/fastReservePage/calendar.png"
              alt="Calendar"
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50"
              width={18}
              height={18}
            />
          </div>
        </div>

        <div>
          <label className="block text-[16px] font-bold text-[#1E2022] dark:text-[#FAFAFA] mb-3">
            تعداد نفرات
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="۰"
              className="w-full bg-gray-50 border-none rounded-[24px] py-3 px-5  text-sm focus:ring-2
               focus:ring-blue-100 outline-none dark:bg-[#3F3F46] "
            />
          </div>
        </div>
      </div>

      <hr className="my-4 border-[#DDDDDD] dark:border-[#454545]" />

      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="bg-red-500 text-white text-[14px] font-bold px-2 py-1 rounded-full">
            ۵۰٪ تخفیف
          </span>
          <span className="text-[#777777] text-[24px] line-through decoration-1">
            ۵,۰۰۰,۰۰۰ تومان
          </span>
        </div>
        <div className="flex justify-end items-center">
          <span className="text-[24px] font-bold text-[#1E2022] dark:text-[#FAFAFA] ">
            ۲,۵۰۰,۰۰۰ <span>تومان</span>
          </span>
        </div>
      </div>

      <button
        className="w-full bg-primary
       hover:bg-[#0c2a4a] text-white py-3 rounded-[24px] text-sm font-medium transition-colors"
      >
        ثبت درخواست رزرو
      </button>
    </div>
  );
};

export default BookingCard;
