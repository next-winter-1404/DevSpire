type MessageModalProps = {
  open: boolean;
  onClose: () => void;
  title: string | null;
  message: string | null;
};

export const ContactUsDetailModal = ({
  open,
  onClose,
  title,
  message,
}: MessageModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#ffff] dark:bg-[#1f1f23] rounded-xl max-w-lg w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">{title ?? "بدون عنوان"}</h2>

        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {message ?? "-"}
        </p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#333] hover:bg-gray-200 dark:hover:bg-[#444]"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
