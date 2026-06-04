import CommentForm from "@/components/common/HouseCommentForm";
import { useState } from "react";
import { ICommentTreeItem } from "../types";
import moment from "jalali-moment";
import Image from "next/image";
import { MessageCircle, Star } from "lucide-react";
import { useLocale } from "next-intl";

interface IProps {
  comment: ICommentTreeItem;
  isReply?: boolean;
  depth?: number;
}
export default function CommentItem({ comment, isReply, depth = 0 }: IProps) {
  const locale = useLocale();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [seeReplyes, setSeeReplyes] = useState<boolean>(false);

  const onCancel = () => {
    setIsReplying(false);
  };

  const indent = Math.min(depth * 16, 64);
  return (
    <div className="mt-4">
      <div className={` ${isReply ? "" : "border-t border-[#DDDDDD]"} py-4 `}>
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-[55px] h-[55px] relative bg-gray-200
           dark:bg-[#777777] rounded-full overflow-hidden "
          >
            {comment.user.profilePicture ? (
              // <Image
              //   src={comment.user.profilePicture}
              //   alt={comment.user.firstName}
              //   fill
              //   className="object-cover "
              // />
              <div className="w-full h-full flex items-center justify-center ">
                {comment.user.firstName[0]}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center ">
                {comment.user.firstName[0]}
              </div>
            )}
          </div>
          <div>
            <div className="font-bold text-[16px] text-foreground ">
              {comment.user.firstName} {comment.user.lastName}
            </div>
            <div className="text-[14px] text-[#777777]">
              {locale == "fa"
                ? moment(comment.created_at)
                    .locale("fa")
                    .format("dddd jD jMMMM jYYYY HH:mm")
                : moment(comment.created_at)
                    .locale("en")
                    .format("dddd D MMMM YYYY HH:mm")}{" "}
            </div>
          </div>
        </div>

        <div className="w-full h-full mt-3 flex flex-col gap-1">
          <h4 className="font-bold text-[14px] text-foreground ">
            {comment.title}
          </h4>
          <p className="text-[#777777] mt-1 text-sm">{comment.caption}</p>
        </div>

        <div className="flex items-center gap-6 mt-5 text-sm text-foreground">
          <div className="flex items-center gap-1 pb-1 rounded-full">
            {[5, 4, 3, 2, 1].map((star) => (
              <Star
                key={star}
                size={16}
                className={
                  star <= parseInt(comment.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          {comment.children.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageCircle size={20} />
              <button
                onClick={() => setSeeReplyes((prev) => !prev)}
                className="hover:text-blue-700 transition-all duration-150 cursor-pointer "
              >
                {comment.children.length} پاسخ{" "}
              </button>
            </div>
          )}
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="hover:text-blue-800 cursor-pointer  "
          >
            پاسخ دادن
          </button>
        </div>
      </div>

      {isReplying && (
        <div className="mr-4 transition-all duration-150">
          <CommentForm
            isReply={true}
            houseId={comment.house_id}
            parentId={comment.id}
            onClose={onCancel}
          />
        </div>
      )}

      {seeReplyes && comment.children && comment.children.length > 0 && (
        <div
          style={{ marginRight: `${indent}px` }}
          className=" border-r-2 border-[#DDDDDD] pr-4"
        >
          {comment.children.map((child) => (
            <CommentItem
              depth={depth + 1}
              isReply={true}
              key={child.id}
              comment={child}
            />
          ))}
        </div>
      )}
    </div>
  );
}
