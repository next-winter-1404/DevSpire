export const dynamic = "force-static";

import Container from "@/components/common/Container";
import PropertyComparison, {
  ICompareProperty,
} from "@/components/common/PropertyComparison";
import { THouse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { Link } from "@/i18n/routing";
import { customMetadataGenerator } from "@/utils/helper/Metadata";
import { AlertCircle, ArrowRight, Home } from "lucide-react";

export async function generateMetadata() {
  return customMetadataGenerator({
    title: "مقایسه املاک",
    description: "ملک های مورد نظرتان را باهم مقایسه کنید",
  });
}

const comparisonPage = async ({
  params,
}: {
  params: Promise<{ ids: string[] }>;
}) => {
  const [firstId, secondId] = (await params).ids;

  const res = await apiFetch<ICompareProperty[] | null>(`/comparison`, {
    params: {
      ids: [firstId, secondId],
    },
  });
  console.log(res);

  return (
    <Container>
      {!res ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 py-12 px-4 text-center">
          <div
            className="w-24 h-24 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full 
          flex items-center justify-center mb-2"
          >
            <AlertCircle size={48} strokeWidth={1.5} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            اطلاعات برای مقایسه کافی نیست
          </h2>

          <p className="text-slate-500 dark:text-slate-400 max-w-md mb-4 leading-relaxed">
            برای انجام مقایسه، لطفاً دقیقاً دو اقامتگاه را انتخاب کنید. ممکن است
            لینک مقایسه نامعتبر باشد یا یکی از اقامتگاه‌ها از سیستم حذف شده
            باشد.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary
               text-white rounded-2xl font-medium transition-colors"
            >
              <Home size={20} />
              <span>بازگشت به صفحه اصلی</span>
            </Link>
          </div>
        </div>
      ) : (
        <PropertyComparison properties={res} />
      )}
    </Container>
  );
};

export default comparisonPage;
