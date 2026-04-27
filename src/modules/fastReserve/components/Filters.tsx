import Image from "next/image";

const FastReserveSideFilters = () => {
  return (
    <div
      className="border border-[#dddd] dark:border-[#333333] bg-[#ffff]  dark:bg-[#27272A]
     rounded-[24px] p-4 "
    >
      <div className="flex flex-col gap-2 lg:flex-row  lg:gap-6  lg:justify-between w-full ">
        <div className="flex flex-col gap-6 lg:w-[50%]">
          <div className="flex flex-col gap-4 justify-start items-start">
            <h2 className="text-[16px] text-[#1E2022] font-bold dark:text-[#FAFAFA] ">
              جستجو
            </h2>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="نام هتل مورد نظر"
                className="w-full bg-[#F5F5F5] dark:bg-[#3F3F46] border-none rounded-[40px] py-3 px-5
                 placeholder:text-[#777777] placeholder:text-[16px] text-right  outline-none text-[#1E2022]
                  text-[16px]"
              />
              <Image
                src="/icons/fastReservePage/search.png"
                alt="bath"
                width={16}
                height={16}
                className=" absolute top-[50%] translate-y-[-50%] left-5"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start">
            <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
              امکانات هتل
            </label>
            <div className="relative w-full">
              <select
                className="w-full bg-[#F5F5F5] border-none rounded-[40px] py-3 px-5 text-right 
               appearance-none outline-none text-[#777777] text-[16px]  dark:bg-[#3F3F46] "
              >
                <option className="">استان، شهر...</option>
              </select>
              <Image
                src="/icons/fastReservePage/down.png"
                alt="bed"
                width={15}
                height={15}
                className=" absolute left-5 top-[50%] translate-y-[-50%]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:w-[50%]">
          <div className="flex flex-col gap-4 justify-start items-start">
            <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
              مرتب سازی بر اساس
            </label>
            <div className="relative w-full">
              <select
                className="w-full bg-[#F5F5F5] border-none rounded-[40px] py-3 px-5 text-right 
               appearance-none outline-none text-[#777777] text-[16px] dark:bg-[#3F3F46]"
              >
                <option>جدید ترین ها</option>
                <option>ارزان ترین ها</option>
              </select>
              <Image
                src="/icons/fastReservePage/down.png"
                alt="bed"
                width={15}
                height={15}
                className=" absolute left-5 top-[50%] translate-y-[-50%]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start">
            <label className="text-[16px] text-[#1E2022] dark:text-[#FAFAFA] font-bold">
              رنج قیمت
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastReserveSideFilters;
