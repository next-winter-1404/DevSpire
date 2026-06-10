import { X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
}

export default function ConfirmDeleteModal({
  isPending,
  isOpen,
  onClose,
  onConfirm,
}: Props) {
  if (!isOpen) return null;
  const t = useTranslations("common.deleteModal");
  const locale = useLocale();
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div           dir={locale === "fa" ? "rtl" : "ltr"}
 className="w-full max-w-md bg-white dark:bg-[#1f2937] rounded-2xl shadow-xl p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full bg-gray-100
            cursor-pointer dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>

          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
           {t("title")}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {t("description")}
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
            >
              {t("confirm")}
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
