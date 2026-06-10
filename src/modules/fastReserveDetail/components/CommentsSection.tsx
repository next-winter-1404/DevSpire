"use client";
import { useTranslations } from "next-intl";
import CommentForm from "../../../components/common/HouseCommentForm";
import { useComments } from "../hooks/useComment";
import CommentItem from "./CommentItem";
import { ICommentTreeItem } from "../types";
import { BuildCommentTree } from "@/utils/helper/buildCommentTree";
import CommentItemSkeleton from "./CommentItemSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CommentsSection = ({ houseId }: { houseId: number }) => {
  const t = useTranslations("fastReserveDetail");

  const { flatComments, isPending } = useComments(houseId);
  const treeComments: ICommentTreeItem[] = BuildCommentTree(
    flatComments?.comments || [],
  );

  return (
    <div className="w-full  p-6 md:p-8 bg-[#F5F5F5] dark:bg-[#27272A] rounded-[24px] shadow">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-[20px] font-bold text-foreground">
          {t("allComments")}
        </h2>
        {isPending ? (
          <Skeleton circle width={24} height={24} />
        ) : (
          <span
            className="bg-primary text-white text-[16px] w-7 h-7 flex items-center justify-center 
        rounded-full font-bold"
          >
            {flatComments?.totalCount || 0}
          </span>
        )}
      </div>

      <CommentForm houseId={houseId} />

      <div className="flex flex-col mt-4">
        {isPending ? (
          <>
            {Array.from({ length: 5 }, (_, i) => (
              <CommentItemSkeleton key={i} />
            ))}
          </>
        ) : treeComments.length > 0 ? (
          <>
            {treeComments?.map((comment) => (
              <CommentItem isReply={false} key={comment.id} comment={comment} />
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
           <p className="text-sm text-muted-foreground mb-3">
  {t("noComments")}
</p>

<p className="text-xs text-muted-foreground">
  {t("beFirstComment")}
</p>

          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
