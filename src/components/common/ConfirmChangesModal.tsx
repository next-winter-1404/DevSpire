import { X } from "lucide-react";

interface Props {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmChangesModal({
  isOpen,
  onClose,
  onConfirm,
  title,
}: Props) {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-md bg-[#ffff] dark:bg-[#1f2937] 
        rounded-2xl shadow-xl p-6 text-center relative"
        >
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full bg-gray-100
            cursor-pointer dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>

          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
            {title || "ایا برای انجام این تغییر مطمعنید ؟"}
          </h2>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-6 py-2 rounded-xl bg-blue-500 hover:bg-blue-600
               text-white text-sm font-medium transition"
            >
              ادامه دادن
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
