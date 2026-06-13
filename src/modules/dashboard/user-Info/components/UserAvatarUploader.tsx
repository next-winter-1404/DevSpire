/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { getUserInfo, uploadUserAvatar } from "../services/userService";
import Image from "next/image";

interface Props {
  userId: string;
}
export default function UserAvatarUploader({ userId }: Props) {
  const t = useTranslations("User");
  const [preview, setPreview] = useState<string | null>(null);
  const [tempPreview, setTempPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!userId) return;

    getUserInfo(userId)
      .then((data) => {
        if (data.profilePicture) setPreview(data.profilePicture ?? null);
      })
      .catch(() => {});
  }, [userId]);
  useEffect(() => {
    return () => {
      if (tempPreview?.startsWith("blob:")) URL.revokeObjectURL(tempPreview);
    };
  }, [tempPreview]);

  const resetSelection = () => {
    setSelectedFile(null);
    if (tempPreview?.startsWith("blob:")) URL.revokeObjectURL(tempPreview);
    setTempPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetSelection();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (tempPreview?.startsWith("blob:")) URL.revokeObjectURL(tempPreview);
    setSelectedFile(file);
    setTempPreview(URL.createObjectURL(file));
    if (inputRef.current) inputRef.current.value = "";
  };
  const handleSave = async () => {
    if (!selectedFile) {
      closeModal();
      return;
    }

    try {
      setLoading(true);
      await uploadUserAvatar(selectedFile);
      if (tempPreview) {
        setPreview(tempPreview);
      }

      toast.success(t("avatarUpdated"));
      setIsModalOpen(false);
      setSelectedFile(null);
      setTempPreview(null);
    } catch (err: any) {
      toast.error(err?.message || t("avatarUploadError"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className="w-44 h-44 rounded-full overflow-hidden border border-gray-200 relative
         cursor-pointer hover:opacity-80 transition dark:border-white/10 dark:bg-[#1E2022]"
        onClick={() => setIsModalOpen(true)}
      >
        {preview ? (
          <Image src={preview} fill className=" object-cover" alt="avatar" />
        ) : (
          <div
            className="flex items-center justify-center h-full text-gray-400 bg-gray-100
           dark:bg-[#1E2022] dark:text-white/40"
          >
            {t("avatar")}
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className="flex flex-col items-center shadow-[0px_4px_4px_0px_#00000040] transition-colors bg-white dark:bg-[#1E2022]"
            style={{
              width: "446px",
              height: "384px",
              borderRadius: "24px",
              padding: "32px",
              gap: "32px",
              backgroundColor:
                typeof document !== "undefined" &&
                document.documentElement.classList.contains("dark")
                  ? "#1E2022"
                  : undefined,
            }}
          >
            <div className="w-[382px] h-[48px] flex justify-between items-center">
              <span className="font-bold text-xl text-black dark:text-white">
                {t("selectProfile")}
              </span>
              <div
                className="w-[48px] h-[48px] rounded-full bg-gray-100 relative
                 dark:bg-white/10 flex items-center justify-center p-[12px] cursor-pointer"
                onClick={closeModal}
              >
                <Image
                  src="/icons/close.svg"
                  alt="close"
                  fill
                  className="w-full h-full object-cover dark:invert"
                />
              </div>
            </div>
            <label
              className="w-42 h-42 rounded-full border border-gray-300 dark:border-white/20 
            flex items-center justify-center cursor-pointer overflow-hidden hover:bg-gray-50
            relative dark:hover:bg-white/5 transition-colors"
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onFileChange}
              />
              {tempPreview || preview ? (
                <Image
                  src={(tempPreview || preview) as string}
                  fill
                  className="w-full h-full object-cover"
                  alt="preview"
                />
              ) : (
                <span className="text-2xl text-gray-400 dark:text-white">
                  +
                </span>
              )}
            </label>
            <div className="w-[382px] h-[48px] flex gap-[24px]">
              <button
                className="flex-1 cursor-pointer rounded-[16px] border border-[#777777] px-[12px] py-[8px] 
                               text-gray-700 dark:text-white/80 dark:border-white/20"
                onClick={closeModal}
                disabled={loading}
              >
                {t("cancel")}
              </button>
              <button
                className="flex-1 cursor-pointer rounded-[16px] bg-[#0D3B66] text-white px-[12px] py-[8px]"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? t("uploading") : t("confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
