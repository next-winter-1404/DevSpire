import Container from "@/components/common/Container";
import PropertyValuationForm from "../components/PropertyValuationForm";
import { useTranslations } from "next-intl";
export default function PropertyValuationView() {
  const t = useTranslations('Valuation');
  return (
    <Container>
      <div className="relative w-full">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-black leading-tight md:text-5xl">
            {t('heroTitle')}
            <span className="text-primary">{t('heroTitleHighlight')}</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#777777] md:text-base">
            {t('heroDesc')}
          </p>
        </div>

        <PropertyValuationForm />
      </div>
    </Container>
  );
}
