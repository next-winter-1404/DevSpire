import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import ToggleTheme from "@/components/common/ToggleTheme";
import { Link } from "@/i18n/routing";
import { Home } from "lucide-react";
import AuthSocialButtons from "../../components/AuthSocialButtons";
import LoginForm from "../components/LoginForm";

const LoginView = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="w-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base text-[#0D3B66] hover:opacity-80 transition-opacity"
        >
          <Home className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          <span>صفحه اصلی</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3 h-8">
          <ToggleTheme />
          <div className="h-full">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-3 mt-8 md:mt-10">
        <h2 className="font-bold text-xl md:text-2xl text-foreground">
          ورود به حساب کاربری
        </h2>
        <h3 className="text-sm md:text-base text-foreground/80 leading-relaxed">
          برای دسترسی به خدمات و تجربه بهتر در سایت، وارد حساب خود شوید.
        </h3>
      </div>

      <div className="w-full mt-8 md:mt-10">
        <LoginForm />
      </div>

      <div className="flex items-center my-8 md:my-10">
        <div className="grow border-t border-gray-300 dark:border-zinc-700"></div>
        <span className="mx-3 md:mx-4 text-sm text-gray-500">یا</span>
        <div className="grow border-t border-gray-300 dark:border-zinc-700"></div>
      </div>

      <div className="w-full mt-2 md:mt-4">
        <AuthSocialButtons />
      </div>

      <div className="w-full mt-10 md:mt-12 text-sm md:text-base flex items-center gap-2 justify-center">
        <h2 className="text-foreground">حساب کاربری ندارید؟</h2>
        <Link
          href={"/auth/register"}
          className="text-primary font-medium hover:underline"
        >
          ثبت نام کنید
        </Link>
      </div>
    </div>
  );
};

export default LoginView;
