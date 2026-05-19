import CommentForm from "@/components/common/HouseCommentForm";
import { useTranslations } from "next-intl";

const CommentsSection = () => {
  const t = useTranslations("fastReserveDetail");
  return (
    <div className="w-full  p-6 md:p-8 bg-[#F5F5F5] dark:bg-[#27272A] rounded-[24px] shadow">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-[18px] font-bold text-foreground">
          {t("allComments")}
        </h2>
        <span
          className="bg-primary text-white text-[16px] w-6 h-6 flex items-center justify-center 
        rounded-full font-bold"
        >
          4
        </span>
      </div>
      {/* <CommentForm /> */}
      {/* <div className="flex flex-col mt-4">
        {commentsData.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div> */}
    </div>
  );
};

export default CommentsSection;
