"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { GitCompare } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { MouseEvent } from "react";

const AddToCompare = ({ houseId }: { houseId: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const firstItem = searchParams.get("firstItem") ?? "";

  const isSelected = houseId === Number(firstItem);

  const handleCompare = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentId = String(houseId);
    const params = new URLSearchParams(searchParams.toString());

    if (firstItem === currentId) {
      params.delete("firstItem");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      return;
    }

    if (!firstItem) {
      params.set("firstItem", currentId);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      return;
    }

    if (firstItem && firstItem !== currentId) {
      router.push(`/comparison/${firstItem}/${currentId}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCompare}
      className={`
        cursor-pointer
        ${isSelected ? "bg-green-600/40" : "bg-white/15"}
        backdrop-blur-md
        w-13 h-13
        flex justify-center items-center
        rounded-full
        hover:bg-green-600/40
        transition-colors duration-200
      `}
    >
      <GitCompare size={26} className="text-white" />
    </button>
  );
};

export default AddToCompare;
