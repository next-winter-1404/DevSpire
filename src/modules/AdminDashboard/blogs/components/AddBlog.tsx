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
        className="flex items-center gap-3 py-3 px-4 text-[#FFFFFF] bg-[#0D3B66] 
              rounded-[16px] cursor-pointer whitespace-nowrap
            dark:text-[#0D3B66] dark:bg-[#E6EDF5] text-sm"
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
