import { apiFetch } from "@/core/Server-fetch/fetchApi";
import Container from "@/components/common/Container";
import { MessageSquare } from "lucide-react";
import PropertyQAList, { IQAItem } from "../components/PropertyQA";
import AskQuestionModal from "../components/AskQA";

const PropertyQAView = async ({ id }: { id: number }) => {
  const res = await apiFetch<IQAItem[] | null>(`/property-QA/${id}`, {
    cache: "no-store",
  });
  console.log(res);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#0d3b66] p-2 rounded-lg">
              <MessageSquare className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0d3b66]">پرسش و پاسخ</h2>
          </div>
          <AskQuestionModal houseId={id} />
        </div>

        {res && res?.length > 0 ? (
          <div className="max-h-[650px] overflow-y-auto scroll-smooth">
            <PropertyQAList isSeller={false} data={res} />
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">
              هنوز سوالی برای این ملک ثبت نشده است.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyQAView;
