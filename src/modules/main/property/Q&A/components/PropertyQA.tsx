import React from "react";
import { User, CheckCircle2, HelpCircle, MessageCircle } from "lucide-react";
import { useLocale } from "next-intl";
import { FormatDate } from "@/utils/helper/FormatDate";
import AnswerQuestionModal from "./AnswerQA";

export interface IQAItem {
  id: number;
  houseId: number;
  userId: number;
  question: string;
  answer: string | null;
  answeredBy: number | null;
  created_at: string;
  updated_at: string;
}

const PropertyQAList = ({
  data,
  isSeller,
}: {
  data: IQAItem[];
  isSeller: boolean;
}) => {
  const locale = useLocale();
  return (
    <div className="space-y-6 ">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-background border border-slate-100 rounded-3xl shadow-sm hover:shadow-md
           transition-shadow overflow-hidden"
        >
          <div className="p-6 pb-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                  <HelpCircle className="text-[#ff7f11] w-6 h-6" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    سوال کاربر
                  </span>
                  <span className="text-xs text-slate-400">
                    {FormatDate(item.created_at, locale == "fa" ? "fa" : "en")}
                  </span>
                </div>
                <p className="text-[#0d3b66] text-lg font-medium leading-relaxed">
                  {item.question}
                </p>
              </div>
            </div>
            {isSeller && (
              <div className="mt-3">
                <AnswerQuestionModal
                  questionId={item.id}
                  question={item.question}
                />
              </div>
            )}
          </div>

          {item.answer ? (
            <div className="bg-slate-50/80 p-6 pt-5 border-t border-slate-100">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-[#0d3b66]/10 rounded-full flex items-center justify-center">
                    <User className="text-[#0d3b66] w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-[#0d3b66]">
                      پاسخ
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-slate-600 leading-7">{item.answer}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 py-4 bg-orange-50/30 border-t border-orange-100">
              <span className="text-sm text-orange-600 italic">
                در انتظار پاسخ ...
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyQAList;
