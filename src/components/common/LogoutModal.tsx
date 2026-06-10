import { LogOut } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
import { useTranslations, useLocale } from "next-intl";

export default function LogoutModal({ open, onClose, onConfirm }: Props) {
  if (!open) return null;
  const t = useTranslations("common.logoutModal");
  const locale = useLocale();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="relative bg-white w-[420px] rounded-2xl shadow-xl p-6">
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full
         bg-red-100 mx-auto mb-4"
        >
          <LogOut className="text-red-600 w-6 h-6" />
        </div>
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-2">
          {t("title")}
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          {t("message")}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600
             hover:bg-gray-100 transition"
          >
            {t("cancel")}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-red-600 text-white
             hover:bg-red-700 transition"
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
