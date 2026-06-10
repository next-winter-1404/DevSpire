"use client";

import {
  Loader2,
  X,
  Star,
  Calendar,
  User,
  Home,
  MessageSquare,
} from "lucide-react";
import { useComments } from "../hooks";
import { FormatDate } from "@/utils/helper/FormatDate";

interface IProps {
  onClose: () => void;
  id: number;
}
import { useTranslations } from "next-intl";


const CommentsDetailModal = ({ onClose, id }: IProps) => {
  const { commentDetail, isPending } = useComments(id);

const t = useTranslations("sellerDashboard.comments");

  if (isPending) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 p-8 bg-background rounded-2xl border border-border shadow-2xl">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground animate-pulse">
<p>{t("loadingDetail")}</p>
          </p>
        </div>
      </div>
    );
  }

  if (!commentDetail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl 
        bg-background shadow-2xl animate-in fade-in zoom-in duration-200"
      >
        <div
          className="flex items-center justify-between border-b
         border-border p-5 bg-muted/30 relative "
        >
          <h3 className="text-lg font-bold text-foreground">{t("detailTitle")} </h3>
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full bg-gray-100
            cursor-pointer dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {commentDetail.user.firstName} {commentDetail.user.lastName}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{FormatDate(commentDetail.created_at, "fa")}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-xl font-bold text-foreground">
              {commentDetail.title}
            </h4>
            <div className="flex items-center gap-1.5 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium text-foreground">
                {commentDetail.rating} / 5
              </span>
            </div>
            <p className="leading-7 text-muted-foreground bg-muted/40 p-4 rounded-xl text-sm">
              {commentDetail.caption}
            </p>
          </div>

          <div className="flex items-center gap-3 border-t border-border pt-4">
            <Home className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
{t("relatedToHouse")}!             </span>
              <span className="text-sm font-medium text-foreground">
                {commentDetail.house.title}
              </span>
            </div>
          </div>

          {commentDetail.parent_comment && (
            <div className="border-r-4 border-primary/50 bg-primary/5 p-4 rounded-r-lg space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs font-bold"> {t("replyTo")}:</span>
              </div>
              <p className="text-sm text-foreground/80 italic">
                {commentDetail.parent_comment.title}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-primary text-white
             text-sm font-medium hover:opacity-90 transition-opacity"
          >
{t("close")}          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsDetailModal;
