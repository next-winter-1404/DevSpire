"use client";
import Edit from "../../../../../public/icons/Edit";
import Trash from "../../../../../public/icons/Trash";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useRouter } from "@/i18n/routing";
import axios from "axios";
import { THouse } from "@/components/common/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteHouse } from "../services/DELETE/deleteHouse";
import DeleteModal from "./DeleteModal";
import { useTranslations } from "next-intl";

interface IProps {
  onClose: () => void;
  item: THouse;
  role: "seller" | "admin";
}

const ActionsModal = ({ onClose, item, role }: IProps) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const t = useTranslations("sellerDashboard.estates");
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteHouseMutation = useMutation({
    mutationFn: async () => await DeleteHouse(item.id, role),
    onSuccess: (res) => {
      toast.success(res?.data?.message || t("deleteSuccess"));
      queryClient.invalidateQueries({
        queryKey: ["DELETEHOUSE"],
      });
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || t("deleteError"));
      }
    },
  });
  const menuRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const handleCloseMenu = (e: MouseEvent) => {
  //     if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener("click", handleCloseMenu);
  //   return () => document.removeEventListener("click", handleCloseMenu);
  // }, [item]);

  return (
    <>
      <DropdownMenu.Root dir="rtl">
        <DropdownMenu.Trigger asChild>
          <button className="p-1 rounded-md hover:bg-gray-200">
            <MoreVertical className="w-5 h-5" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className="z-50 min-w-[140px] bg-[#ffff] rounded-[16px] border-b border-[#DDDDDD]
          transition-colors h-[90%]  overflow-hidden  dark:border-[#333333]  dark:bg-[#262626]  
            p-2 shadow-lg"
          >
            <DropdownMenu.Item asChild>
              <Link
                href={`/dashboard/${role == "seller" ? "seller" : "admin"}/estates-management/${item.id}`}
                className="flex items-center gap-2 rounded-md p-2 outline-none cursor-pointer
                 hover:bg-slate-100 dark:hover:bg-sky-950 "
              >
                <Edit />
                <span>{t("edit")}</span>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => setIsOpenDeleteModal(true)}
              className="flex items-center gap-2 rounded-md p-2 outline-none cursor-pointer
                dark:hover:bg-sky-950"
            >
              <Trash />
              <span>{t("delete")}</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      {isOpenDeleteModal && (
        <>
          <DeleteModal
            setIsOpenDeleteModal={setIsOpenDeleteModal}
            deleteHouseMutation={() => {
              deleteHouseMutation.mutate();
            }}
          />
        </>
      )}
    </>
  );
};

export default ActionsModal;
