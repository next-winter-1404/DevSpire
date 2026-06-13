import { IHouseCMPayload } from "@/modules/main/booking/types";
import { useComments } from "@/modules/main/fastReserveDetail/hooks/useComment";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";

const CommentForm = ({
  isReply = false,
  onClose,
  houseId,
  parentId,
}: {
  isReply?: boolean;
  onClose?: () => void;
  parentId?: number;
  houseId: number;
}) => {
  const t = useTranslations("fastReserveDetail");
  const { postCommentMutation } = useComments(houseId);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IHouseCMPayload>({
    defaultValues: {
      rating: 0,
    },
  });

  const getData = (data: IHouseCMPayload) => {
    postCommentMutation.mutate(
      {
        ...data,
        parent_comment_id: parentId,
      },
      {
        onSuccess: () => {
          onClose?.();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(getData)} className="w-full">
      <div
        className={`w-full flex flex-col gap-4 ${isReply ? "p-5 " : "mb-3"}`}
      >
        <div className="w-full flex flex-col gap-3 relative pb-6  ">
          {!isReply && (
            <label className="text-[15px] font-bold text-foreground">
              {t("seeTitle")}
            </label>
          )}

          <input
            type="text"
            placeholder={isReply ? t("replyTitle") : t("seeTitlePlaceHolder")}
            {...register("title", {
              required: "عنوان کامنت الزامی است",
            })}
            className={`
              w-full rounded-2xl  bg-background px-4 py-3 text-sm
              transition-all outline-none
              focus:ring-2 focus:ring-blue-700/20
              dark:bg-[#3F3F46]
              ${
                errors.title
                  ? " border border-red-500"
                  : "  focus:ring-blue-700"
              }
            `}
          />

          {errors.title?.message && (
            <span className="absolute bottom-0 text-[12px] font-medium text-red-500">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col gap-3 relative pb-6 ">
          {!isReply && (
            <label className="text-[15px] font-bold text-foreground">
              {t("seeCaption")}
            </label>
          )}

          <textarea
            rows={isReply ? 3 : 5}
            {...register("caption", {
              required: "توضیحات لازم است",
            })}
            placeholder={
              isReply ? t("replyCaption") : t("seeCaptionPlaceHolder")
            }
            className={`
              w-full resize-none rounded-2xl  bg-background
              px-4 py-3 text-sm leading-7 transition-all outline-none
              focus:ring-2 focus:ring-blue-700/20
              dark:bg-[#3F3F46]
              ${
                errors.caption
                  ? " border border-red-500"
                  : " focus:border-blue-700"
              }
            `}
          />

          {errors.caption?.message && (
            <span className="absolute bottom-0 text-[12px] font-medium text-red-500">
              {errors.caption.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {!isReply && (
            <label className="text-[15px] font-bold text-foreground">
              امتیاز شما
            </label>
          )}

          <div
            className="
                flex items-center justify-between relative pb-4"
          >
            <Controller
              name="rating"
              control={control}
              rules={{
                validate: (value) => value > 0 || "امتیاز خود را انتخاب کنید",
              }}
              render={({ field }) => (
                <Rating
                  initialValue={field.value}
                  onClick={field.onChange}
                  size={30}
                  allowFraction={false}
                  fillColor="#facc15"
                  emptyColor="#d1d5db"
                  transition
                  SVGstyle={{ display: "inline-block" }}
                />
              )}
            />
          </div>

          {errors.rating?.message && (
            <span className="text-[12px] font-medium text-red-500">
              {errors.rating.message}
            </span>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 ">
          {isReply && (
            <button
              type="button"
              onClick={onClose}
              className="  cursor-pointer
                rounded-xl border border-border
                px-4 py-2 text-sm text-muted-foreground
                transition-all hover:bg-muted
              "
            >
              {t("cancel")}
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className=" cursor-pointer
              rounded-xl bg-primary px-5 py-2.5
              text-sm font-medium text-white
              transition-all hover:bg-primary/90
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {isSubmitting || postCommentMutation.isPending
              ? "در حال ارسال..."
              : `${t("send")} ${isReply ? t("reply") : t("comment")}`}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
