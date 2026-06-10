"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import BlogCreateEditModal from "./BlogForm";
import { useTranslations } from "next-intl";

const AddBlog = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
const t = useTranslations("adminDashboard.blogs");

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-3 py-3 px-4 text-[#FFFFFF] bg-[#0D3B66] 
              rounded-[16px] cursor-pointer whitespace-nowrap
            dark:text-[#0D3B66] dark:bg-[#E6EDF5] text-sm"
      >
        <Plus />
        <span className=" ">{t("addArticle")}</span>
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
