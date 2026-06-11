import Telegram from "../../../../public/icons/Telegram";
import Instagram from "../../../../public/icons/Instagram";
import Linkedin from "../../../../public/icons/Linkedin";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Logo from "../../../../public/icons/Logo";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { Link } from "@/i18n/routing";
import { Globe, Network, Webcam } from "lucide-react";

export interface ISocials {
  id: 9;
  platform: string;
  url: "https://bale.com/real_adminBale";
}

export interface ISocialsRes {
  data: ISocials[];
  totalCount: number;
}

const Footer = ({ socials }: { socials: ISocials[] }) => {
  const t = useTranslations("footer");

  return (
    <div className="flex justify-center mt-30">
      <div className="flex flex-col gap-10 w-full pt-20 pb-10 px-10 rounded-[24px] bg-[#0D3B66]">
        <div className="flex flex-col justify-between   lg:flex lg:flex-row">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 text-[#FF7F11]">
              <Logo className="w-10 h-10" />
              <span className="text-[40px]">{t("logo")}</span>
            </div>
            <div className="lg:w-[501px]">
              <p className="text-[#FFFFFF]">{t("footerText")}</p>
            </div>
            <div className="flex items-center flex-wrap gap-8">
              {socials &&
                socials.length > 0 &&
                socials.map((item) => (
                  <Link key={item.id} href={item.url}>
                    {item.platform == "telegram" ? (
                      <Telegram />
                    ) : item.platform == "instagram" ? (
                      <Instagram />
                    ) : item.platform == "linkedin" ? (
                      <Linkedin />
                    ) : (
                      <Globe className="text-white" />
                    )}
                  </Link>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-6 md:mt-0  lg:flex-row">
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] text-[#FF7F11]">
                {t("accReservation")}
              </h3>
              <span className="text-[16px] text-[#FFFFFF]">
                {t("accReservationText1")}
              </span>
              <span className="text-[16px] text-[#FFFFFF]">
                {t("accReservationText2")}
              </span>
              <span className="text-[16px] text-[#FFFFFF]">
                {t("accReservationText3")}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] text-[#FF7F11]">
                {t("customerServices")}
              </h3>
              <span className="text-[16px] text-[#FFFFFF]">
                {t("customerServicesText1")}
              </span>
              <span className="text-[16px] text-[#FFFFFF]">
                {t("customerServicesText2")}
              </span>
              <span className="text-[16px] text-[#FFFFFF]">
                {t("customerServicesText3")}
              </span>
              <span className="text-[16px] text-[#FFFFFF]">
                {t("customerServicesText4")}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] text-[#FF7F11]">{t("contactUs")}</h3>
              <span className="text-[16px] text-[#FFFFFF]">
                {t("contactUsText1")}
              </span>
              <span className="text-[16px] text-[#FFFFFF]">
                {t("contactUsText2")}
              </span>
              <span className="text-[16px] text-[#FFFFFF]">
                {t("contactUsText3")}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-[#FFFFFF]"></div>
        <div className="flex flex-col gap-4   lg:flex-row lg:justify-between">
          <p className="text-[#FFFFFF]">{t("law")}</p>
          <div className="flex gap-6">
            <div className="flex justify-center items-center p-2 bg-[#FFFFFF] rounded-[16px]">
              <Image
                src={"/images/home/e.png"}
                alt="e"
                width={32}
                height={32}
              />
            </div>
            <div className="flex justify-center items-center p-2 bg-[#FFFFFF] rounded-[16px]">
              <Image
                src={"/images/home/rasane.png"}
                alt="rasane"
                width={32}
                height={32}
              />
            </div>
            <div className="flex justify-center items-center p-2 bg-[#FFFFFF] rounded-[16px]">
              <Image
                src={"/images/home/enamad.png"}
                alt="enamad"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
