import Image from "next/image";
import { useTranslations } from "next-intl";

const AuthImagePanel = () => {
  const t = useTranslations("auth.layout");
  return (
    <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl">
      <Image
        src="/images/auth/login.jpg"
        alt={t("imageAlt")}
        fill
        quality={100}
        className="z-0 object-cover hover:scale-106 transition-all duration-200"
      />
      <div className="absolute bottom-9 p-6 bg-black/60 bg-opacity-50 text-white z-10 rounded-[40px] right-4 left-4 hover:bottom-11 transition-all duration-150 dark:bg-black/40">
        <div className="flex items-center gap-3">
          <div className="h-full flex items-start -space-x-2">
            <Image
              src="/images/auth/person1.png"
              alt={t("userAlt", { number: "1" })}
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
            />
            <Image
              src="/images/auth/person2.png"
              alt={t("userAlt", { number: "2" })}
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
            />
            <Image
              src="/images/auth/person3.png"
              alt={t("userAlt", { number: "3" })}
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
            />
            <Image
              src="/images/auth/person4.png"
              alt={t("userAlt", { number: "4" })}
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
            />
          </div>
          <div className="mt-1">
            <p className="text-lg font-semibold dark:text-white">{t("callToAction")}</p>
            <p className="text-sm text-white/80 dark:text-white/80">{t("description")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePanel;
