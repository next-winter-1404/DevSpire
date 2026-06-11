import Container from "@/components/common/Container";
import PropertyValuationForm from "../components/PropertyValuationForm";

export default function PropertyValuationView() {
  return (
    <Container>
      <div className="relative w-full">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-black leading-tight md:text-5xl">
            قیمت تقریبی ملک خود را
            <span className="text-primary"> فوری و هوشمند</span> بدانید
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#777777] md:text-base">
            با وارد کردن مشخصات ملک، سیستم ارزش‌گذاری ما بر اساس اطلاعات ارسالی
            شما، قیمت تخمینی را محاسبه می‌کند. این تجربه برای کاربر باید سریع،
            شفاف و قابل اعتماد باشد.
          </p>
        </div>

        <PropertyValuationForm />
      </div>
    </Container>
  );
}
