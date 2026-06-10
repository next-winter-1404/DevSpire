"use client";

import { Link } from "@/i18n/routing";
import { Copy, Edit, ExternalLink, Trash, MoreVertical } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialMediaModal from "./SocialMediaModal";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useSocial } from "../hooks";
import { useTranslations,useLocale } from "next-intl";

interface IProps {
  id: number;
  url: string;
}

const SocialMediaActionModal = ({ id, url }: IProps) => {
  const [openSocialModal, setOpenSocialModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const t = useTranslations("adminDashboard.socialMedia");
const locale = useLocale();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("copied"));
    } catch {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t); 
      toast.success("متن کپی شد");

    }
  };
  const { deleteSocialLinkMutation } = useSocial(id);

  return (
    <>
<DropdownMenu.Root dir={locale === "fa" ? "rtl" : "ltr"}>
        <DropdownMenu.Trigger asChild>
          <button className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-white/10">
            <MoreVertical className="w-5 h-5" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            align="start"
            className="
              z-50
              min-w-[150px]
              overflow-hidden
              rounded-xl
              border
              border-gray-100
              bg-white
              dark:bg-[#262626]
              dark:border-[#333333]
              p-1
              shadow-lg
            "
          >
            <DropdownMenu.Item
              onSelect={() => copyToClipboard(url)}
              className="
                flex items-center gap-2
                px-4 py-2
                text-xs
                cursor-pointer
                outline-none
                hover:bg-blue-50/50
                hover:text-blue-600
              "
            >
              <Copy className="w-4 h-4" />
              <span>{t("copyLink")}</span>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild>
              <Link
                href={url}
                className="
                flex items-center gap-2
                px-4 py-2
                text-xs
                cursor-pointer
                outline-none
                hover:bg-blue-50/50
                hover:text-blue-600
              "
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t("openLink")}</span>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => setOpenSocialModal(true)}
              className="
                flex items-center gap-2
                px-4 py-2
                text-xs
                cursor-pointer
                outline-none
                hover:bg-blue-50/50
                hover:text-blue-600
              "
            >
              <Edit className="w-4 h-4" />
              <span>{t("edit")}</span>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => {
                console.log("delete", id);
              }}
              className="
                flex items-center gap-2
                px-4 py-2
                text-xs
                cursor-pointer
                outline-none
                text-red-600
                hover:bg-red-50
              "
              onClick={() => setOpenDeleteModal(true)}
            >
              <Trash className="w-4 h-4" />
              <span>{t("delete")}</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {openSocialModal && (
        <SocialMediaModal onClose={() => setOpenSocialModal(false)} id={id} />
      )}
      {openDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={deleteSocialLinkMutation.mutate}
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
        />
      )}
    </>
  );
};

export default SocialMediaActionModal;
