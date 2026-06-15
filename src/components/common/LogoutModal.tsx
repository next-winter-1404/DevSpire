import { LogOut } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({ open, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="relative bg-white w-full max-w-[420px] rounded-2xl shadow-xl p-6 dark:!bg-[#262626] border border-transparent dark:!border-[#333333] transition-colors">
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full
         bg-red-100 mx-auto mb-4"
        >
          <LogOut className="text-red-600 dark:text-red-500 w-6 h-6" />
        </div>

        <h2 className="text-center text-lg font-semibold text-gray-800 dark:text-[#F5F5F5] mb-2">
          خروج از حساب
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
          آیا از خروج از حساب کاربری خود مطمئن هستید؟
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600
             hover:bg-gray-100 transition"
          >
            انصراف
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-red-600 text-white
             hover:bg-red-700 transition"
          >
            خروج
          </button>
        </div>
      </div>
    </div>
  );
}
