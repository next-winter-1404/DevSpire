"use client";

export default function UserInfoForm() {
    return (
        <form className="grid grid-cols-2 gap-10 w-full">

            {/* نام */}
            <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-[400] font-[Shabnam FD] leading-[100%] text-right">
                    نام
                </label>
                <input
                    className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none"
                    placeholder="نام خود را وارد کنید..."
                />
            </div>

            {/* نام خانوادگی */}
            <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-[400] font-[Shabnam FD] leading-[100%] text-right">
                    نام خانوادگی
                </label>
                <input
                    className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none"
                    placeholder="نام خانوادگی را وارد کنید..."
                />
            </div>
 {/* شماره ملی */}
            <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-[400] font-[Shabnam FD] leading-[100%] text-right">
                    شماره تماس
                </label>
                <input
                    className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none"
                    placeholder="شماره تماس را وارد کنید..."
                />
            </div>

            {/* ایمیل */}
            <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-[400] font-[Shabnam FD] leading-[100%] text-right">
                    ایمیل
                </label>
                <input
                    type="ایمیل خود را وارد کنید..."
                    className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none"
                    placeholder="example@gmail.com"
                />
            </div>

            {/* دکمه */}
            <div className="col-span-2 flex justify-end mt-4">
                <button className="w-[160px] h-[48px] rounded-[16px] bg-[#0D3B66] text-white text-[16px] font-[500]">
                    اعمال تغییرات
                </button>
            </div>

        </form>
    );
}
