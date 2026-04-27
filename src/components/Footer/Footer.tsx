import Home from "../../../public/icons/Home";
import Telegram from "../../../public/icons/Telegram";
import Instagram from "../../../public/icons/Instagram";
import Linkedin from "../../../public/icons/Linkedin";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex justify-center mt-30">
      <div className="flex flex-col gap-10 pt-20 pb-10 px-10 rounded-[24px] bg-[#0D3B66]">
        <div className="flex flex-col justify-between gap-[141px]   sm:flex sm:flex-row">
          <div className="flex flex-col gap-8">
            <div className="flex gap-2 text-[#FF7F11]">
              <Home />
              <span className="text-[40px]">لوگو</span>
            </div>
            <div className="w-[501px]">
              <p className="text-[#FFFFFF]">
                ما همراه شما هستیم در مسیر اجاره، خرید و فروش ویلا؛ تا با اطمینان
                و آرامش، تجربه‌ای دلنشین از انتخاب اقامتگاه یا سرمایه‌گذاری
                به‌یادماندنی داشته باشید.
              </p>
            </div>
            <div className="flex gap-8">
              <Telegram/>
              <Instagram/>
              <Linkedin/>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] text-[#FF7F11]">نحوه رزرو اقامتگاه</h3>
              <span className="text-[16px] text-[#FFFFFF]">
                راهنمای رزرو اقامتگاه
              </span>
              <span className="text-[16px] text-[#FFFFFF]">شیوه پرداخت</span>
              <span className="text-[16px] text-[#FFFFFF]">لغو رزرو اقامتگاه</span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] text-[#FF7F11]">خدمات مشتریان</h3>
              <span className="text-[16px] text-[#FFFFFF]">
                پرسش های متداول مهمان
              </span>
              <span className="text-[16px] text-[#FFFFFF]">
                پرسش های متداول میزبان
              </span>
              <span className="text-[16px] text-[#FFFFFF]">
                چطور اقامتگاه ثبت کنم ؟
              </span>
              <span className="text-[16px] text-[#FFFFFF]">حریم شخصی کاربران</span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] text-[#FF7F11]">راه ارتباطی با ما</h3>
              <span className="text-[16px] text-[#FFFFFF]">
                09229167194 - 098541612310
              </span>
              <span className="text-[16px] text-[#FFFFFF]">Delta@gmail.com</span>
              <span className="text-[16px] text-[#FFFFFF]">
                گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظیمی زاده
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-[#FFFFFF]"></div>
        <div className="flex justify-between">
          <p className="text-[#FFFFFF]">
            تمام حقوق مادی و معنوی این اثر برای برند شما محفوظ است .
          </p>
          <div className="flex gap-6">
            <Image
              src={"/assets/pictures/e.png"}
              alt="e"
              width={32}
              height={32}
            />
            <Image
              src={"/assets/pictures/rasane.png"}
              alt="rasane"
              width={32}
              height={32}
            />
            <Image
              src={"/assets/pictures/enamad.png"}
              alt="enamad"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
