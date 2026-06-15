import Image from "next/image";
import { useTranslations } from "next-intl";
const AuthSocialButtons = () => {
  const t = useTranslations("auth.login");

  return (
    <div
      className="flex  flex-col gap-4 md:flex-row md:gap-0
     md:justify-between md:items-center w-full"
    >
      <button
        className="flex items-center justify-center gap-4 px-18 py-4 border cursor-pointer
       border-gray-300 rounded-[40px] text-foreground text-[16px] md:w-[45%] leading-2
         whitespace-nowrap"
      >
        <Image
          src="/icons/fastReservePage/Google.svg"
          alt="google"
          width={25}
          height={25}
        />
        {t("loginWithGoogle")}
      </button>
      <button
        className="flex items-center justify-center gap-4  px-18 py-4 border cursor-pointer  whitespace-nowrap
       border-gray-300 rounded-[40px] text-foreground text-[16px] leading-2 md:w-[45%] "
      >
        <Image src="/icons/Apple.png" alt="apple" width={25} height={25} />
        {t("loginWithApple")}
      </button>
    </div>
  );
};

export default AuthSocialButtons;
