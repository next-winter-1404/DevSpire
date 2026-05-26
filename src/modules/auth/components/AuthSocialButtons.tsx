import Image from "next/image";
import { useTranslations } from "next-intl";
const AuthSocialButtons = () => {
  const t = useTranslations("auth.login");

  return (
    <div className="flex  flex-col gap-4 md:flex-row md:gap-0 md:justify-between md:items-center w-full">
      <button
        className="flex items-center justify-center gap-4 px-12 py-4 border cursor-pointer
       border-gray-300 rounded-[40px] text-foreground text-[16px] leading-2"
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
        className="flex items-center justify-center gap-4  px-12 py-4 border cursor-pointer
       border-gray-300 rounded-[40px] text-foreground text-[16px] leading-2 "
      >
        <Image
          src="/icons/fastReservePage/Apple.svg"
          alt="apple"
          width={25}
          height={25}
        />
        {t("loginWithApple")}
      </button>
    </div>
  );
};

export default AuthSocialButtons;
