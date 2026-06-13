import httpClient from "@/core/interceptor/axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import PropertyQAList, { IQAItem } from "./PropertyQA";
import { useTranslations } from "next-intl";

interface IProps {
  onClose: () => void;
  houseId: number;
}

const QAListModal = ({ onClose, houseId }: IProps) => {
  const t = useTranslations("PropertyQA");

  const { data, isPending } = useQuery({
    queryKey: ["GETQA"],
    queryFn: async () => {
      try {
        const res = await httpClient(`/property-QA/${houseId}`);
        return res.data as IQAItem[];
      } catch (err) {
        throw err;
      }
    },
  });
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
     bg-black/50 p-4 backdrop-blur-sm"
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl 
       bg-background shadow-xl animate-in fade-in zoom-in duration-200"
      >
        <div className=" relative flex items-center justify-between border-b border-border p-5">
          <h3 className="text-lg font-bold text-foreground"> {t("questionsTitle")}</h3>
          <button
            onClick={onClose}
            className="absolute start-4 top-4 p-2 rounded-full bg-gray-100

            cursor-pointer dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {isPending && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              {t("loading")}
            </p>
          </div>
        )}
        {data && data.length > 0 ? (
          <div className="max-h-[450px] overflow-y-auto scroll-smooth">
            <PropertyQAList isSeller={true} data={data} />
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">
              {t("emptyState")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QAListModal;
