const CommentForm = ({
  isReply = false,
  onCancel,
}: {
  isReply?: boolean;
  onCancel?: () => void;
}) => {
  return (
    <form className="w-full">
      <div
        className={` w-full flex flex-col gap-6 ${isReply ? "mt-3 p-4 bg-muted/30 rounded-xl" : "mb-8"}`}
      >
        <div className={` ${!isReply && "flex flex-col gap-3"} w-full`}>
          {!isReply && (
            <label className="text-[16px] text-foreground font-bold ">
              عنوان دیدگاه
            </label>
          )}
          <input
            type="text"
            placeholder={isReply ? "عنوان پاسخ..." : "عنوان دیدگاه شما..."}
            className="w-full p-4 text-sm rounded-[25px]  bg-background text-foreground
            transition-colors dark:bg-[#3F3F46] "
          />
        </div>
        <div className={` ${!isReply && "flex flex-col gap-3"} w-full`}>
          {!isReply && (
            <label className="text-[16px] text-foreground font-bold ">
              متن دیدگاه
            </label>
          )}
          <textarea
            rows={isReply ? 3 : 5}
            placeholder={
              isReply
                ? "متن پاسخ خود را بنویسید..."
                : "متن دیدگاه خود را بنویسید..."
            }
            className="w-full p-4 text-sm rounded-[25px] bg-background text-foreground dark:bg-[#3F3F46]
            resize-none leading-loose"
          ></textarea>
        </div>

        <div className="flex justify-end gap-2 mt-1">
          {isReply && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg transition-colors"
            >
              انصراف
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2 text-sm bg-primary text-[#ffff] rounded-lg
           font-medium hover:bg-primary/90 transition-colors"
          >
            ارسال {isReply ? "پاسخ" : "دیدگاه"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
