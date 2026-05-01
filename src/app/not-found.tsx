import "./[locale]/globals.css";
import { Link } from "@/i18n/routing";
import { QuestionMarkCircledIcon, ArrowLeftIcon } from "@radix-ui/react-icons";


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center pt-15 text-center px-4 ">
      <div className="bg-muted p-6 rounded-[2.5rem] mb-6 border border-border relative ">
        <QuestionMarkCircledIcon className="w-20 h-20 text-primary opacity-80" />
      </div>

      <h1 className="text-7xl md:text-9xl font-black text-primary mb-2 drop-shadow-sm">
        404
      </h1>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        مقصدی که به دنبالش بودید پیدا نشد!
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-loose text-sm md:text-base">
        احتمالاً آدرس را اشتباه وارد کرده‌اید. بیایید جستجو را از صفحه اصلی
        دوباره شروع کنیم.
      </p>

      <Link
        href="/"
        className="bg-primary text-primary-foreground px-10 py-3.5 rounded-full hover:opacity-90 
        transition-all duration-300 font-medium shadow-lg shadow-primary/20 hover:-translate-y-1 flex items-center gap-2"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        بازگشت به خانه
      </Link>
    </div>
  );
}
