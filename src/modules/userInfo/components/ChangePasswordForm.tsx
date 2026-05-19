"use client";

export default function ChangePasswordForm() {
    return (
        <form className="grid grid-cols-2 gap-6 w-full">

            {/* رمز فعلی */}
            <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-[400] font-[Shabnam FD] leading-[100%] text-right">
                    رمز عبور فعلی
                </label>
                <input
                    type="password"
                    className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none"
                    placeholder="رمز فعلی"
                />
            </div>

            {/* رمز جدید */}
            <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-[400] font-[Shabnam FD] leading-[100%] text-right">
                    رمز عبور جدید
                </label>
                <input
                    type="password"
                    className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none"
                    placeholder="رمز جدید"
                />
            </div>

            {/* تکرار رمز جدید */}
            <div className="flex flex-col gap-2 w-full">
                <label className="text-[16px] font-[400] font-[Shabnam FD] leading-[100%] text-right">
                    تکرار رمز عبور
                </label>
                <input
                    type="password"
                    className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none"
                    placeholder="تکرار رمز"
                />
            </div>

            {/* دکمه */}
            <div className="col-span-2 flex justify-end mt-4">
                <button className="w-[160px] h-[48px] rounded-[16px] bg-[#0D3B66] text-white text-[16px] font-[500]">
                    تغییر رمز عبور
                </button>
            </div>

        </form>
    );
}
