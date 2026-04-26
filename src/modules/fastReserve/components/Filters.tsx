const FastReserveSideFilters = () => {
  return (
    <div className="border border-[#dddd] bg-[#ffff] rounded-[24px] p-4 ">
      <div className="flex flex-col gap-2 lg:flex-row  lg:gap-6  lg:justify-between w-full ">
        <div className="flex flex-col gap-6 lg:w-[50%]">
          <div className="flex flex-col gap-4 justify-start items-start">
            <h2 className="text-[16px] text-[#1E2022] font-bold ">جستجو</h2>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="نام هتل مورد نظر"
                className="w-full bg-[#F5F5F5] border-none rounded-[40px] py-3 px-5 placeholder:text-[#777777]
                placeholder:text-[16px] text-right  outline-none text-[#1E2022] text-[16px]"
              />
              <img
                src="/icons/fastReservePage/search.png"
                alt="bath"
                className="w-4 h-4 absolute top-[50%] translate-y-[-50%] left-5"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start">
            <label className="text-[16px] text-[#1E2022] font-bold">
              امکانات هتل
            </label>
            <div className="relative w-full">
              <select
                className="w-full bg-[#F5F5F5] border-none rounded-[40px] py-3 px-5 text-right 
               appearance-none outline-none text-[#777777] text-[16px] "
              >
                <option className="">استان، شهر...</option>
              </select>
              <img
                src="/icons/fastReservePage/down.png"
                alt="bed"
                className="w-3 h-2 absolute left-5 top-[50%] translate-y-[-50%]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:w-[50%]">
          <div className="flex flex-col gap-4 justify-start items-start">
            <label className="text-[16px] text-[#1E2022] font-bold">
              مرتب سازی بر اساس
            </label>
            <div className="relative w-full">
              <select
                className="w-full bg-[#F5F5F5] border-none rounded-[40px] py-3 px-5 text-right 
               appearance-none outline-none text-[#777777] text-[16px]"
              >
                <option>جدید ترین ها</option>
                <option>ارزان ترین ها</option>
              </select>
              <img
                src="/icons/fastReservePage/down.png"
                alt="bed"
                className="w-3 h-2 absolute left-5 top-[50%] translate-y-[-50%]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start">
            <label className="text-[16px] text-[#1E2022] font-bold">
              رنج قیمت
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastReserveSideFilters;
