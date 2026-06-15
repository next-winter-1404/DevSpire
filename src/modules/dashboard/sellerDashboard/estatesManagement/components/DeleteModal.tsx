import React from "react";
import Close from "../../../../../../public/icons/Close";
import { AlertTriangle } from "lucide-react";

interface IProps {
  setIsOpenDeleteModal: (value: boolean) => void;
  deleteHouseMutation: () => void;
}

const DeleteModal = ({ setIsOpenDeleteModal, deleteHouseMutation }: IProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={() => setIsOpenDeleteModal(false)}
        className="bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 absolute inset-0 cursor-pointer"
      ></div>
      <div
        className="relative z-10 flex flex-col items-center justify-center gap-6 w-full
         max-w-[400px] p-8 
            bg-white rounded-[24px] shadow-2xl animate-in fade-in zoom-in-95 duration-300"
      >
        <button
          onClick={() => setIsOpenDeleteModal(false)}
          className="absolute top-6 left-6 p-2 text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 rounded-full transition-colors cursor-pointer"
        >
          <Close className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 flex items-center justify-center bg-red-50 text-red-500 rounded-full mb-2">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-bold text-2xl text-gray-800">
            آیا از حذف مطمئن هستید؟
          </h3>
          <p className="font-normal text-base text-gray-500">
            امکان برگشت پس از حذف وجود ندارد!
          </p>
        </div>

        <div className="flex gap-4 w-full mt-2 font-medium text-base">
          <button
            onClick={() => setIsOpenDeleteModal(false)}
            className="flex-1 py-3 text-gray-600 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer"
          >
            انصراف
          </button>
          <button
            onClick={() => {
              deleteHouseMutation();
              setIsOpenDeleteModal(false);
            }}
            className="flex-1 py-3 text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 active:scale-95 rounded-2xl transition-all cursor-pointer"
          >
            بله، حذف شود
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
