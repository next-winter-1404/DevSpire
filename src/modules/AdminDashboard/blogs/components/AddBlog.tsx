"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import BlogCreateEditModal from "./BlogForm";

const AddBlog = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-3 py-3 px-4 text-white !bg-[#0D3B66] rounded-[16px] cursor-pointer whitespace-nowrap dark:!bg-[#E6EDF5] dark:!text-[#0D3B66] text-sm font-bold transition-all hover:opacity-90"

      >
        <Plus />
        <span className=" ">افزودن مقاله</span>
      </button>
      {openModal && (
        <BlogCreateEditModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default AddBlog;
