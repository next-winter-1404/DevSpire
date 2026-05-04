import Home from "../../../../public/icons/Home";
import Telegram from "../../../../public/icons/Telegram";
import Instagram from "../../../../public/icons/Instagram";
import Linkedin from "../../../../public/icons/Linkedin";
import Image from "next/image";
import { useTranslations } from "next-intl";



const Footer = () => {

  const t = useTranslations('footer')

  return (
    <div className="flex justify-center mt-30">
      <div className="flex flex-col gap-10 w-full pt-20 pb-10 px-10 rounded-[24px] bg-[#0D3B66]">
        <div className="flex flex-col justify-between   md:flex md:flex-row">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 text-[#FF7F11]">
              <Home className='w-10 h-10'/>
              <span className="text-[40px]">{t('logo')}</span>
            </div>
            <div className="md:w-[501px]">
              <p className="text-[#FFFFFF]">{t('footerText')}</p>
            </div>
            <div className="flex gap-8">
              <Telegram/>
              <Instagram/>
              <Linkedin/>
            </div>
          </div>
          <div className="flex flex-col gap-6   md:flex-row">
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] text-[#FF7F11]">{t('accReservation')}</h3>
              <span className="text-[16px] text-[#FFFFFF]">{t('accReservationText1')}</span>
              <span className="text-[16px] text-[#FFFFFF]">{t('accReservationText2')}</span>
              <span className="text-[16px] text-[#FFFFFF]">{t('accReservationText3')}</span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] text-[#FF7F11]">{t('customerServices')}</h3>
              <span className="text-[16px] text-[#FFFFFF]">{t('customerServicesText1')}</span>
              <span className="text-[16px] text-[#FFFFFF]">{t('customerServicesText2')}</span>
              <span className="text-[16px] text-[#FFFFFF]">{t('customerServicesText3')}</span>
              <span className="text-[16px] text-[#FFFFFF]">{t('customerServicesText4')}</span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] text-[#FF7F11]">{t('contactUs')}</h3>
              <span className="text-[16px] text-[#FFFFFF]">{t('contactUsText1')}</span>
              <span className="text-[16px] text-[#FFFFFF]">{t('contactUsText2')}</span>
              <span className="text-[16px] text-[#FFFFFF]">{t('contactUsText3')}</span>
            </div>
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-[#FFFFFF]"></div>
        <div className="flex flex-col gap-4   md:flex-row md:justify-between">
          <p className="text-[#FFFFFF]">{t('law')}</p>
          <div className="flex gap-6">
            <div className="flex justify-center items-center p-2 bg-[#FFFFFF] rounded-[16px]">
              <Image src={"/images/home/e.png"} alt="e" width={32} height={32}/>
            </div>
            <div className="flex justify-center items-center p-2 bg-[#FFFFFF] rounded-[16px]">
              <Image src={"/images/home/rasane.png"} alt="rasane" width={32} height={32}/>
            </div>
            <div className="flex justify-center items-center p-2 bg-[#FFFFFF] rounded-[16px]">
              <Image src={"/images/home/enamad.png"} alt="enamad" width={32} height={32}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
