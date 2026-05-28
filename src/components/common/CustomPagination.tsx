"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: IPaginationProps) => {
  if (totalPages <= 0) return null;

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getVisiblePages();

  return (
    <nav dir="ltr" className="w-full flex items-center justify-center gap-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50
         dark:bg-[#27272A]
         text-slate-600 transition-colors hover:bg-slate-100 
         disabled:opacity-50 disabled:cursor-not-allowed
         cursor-pointer"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {pages.map((page, i) => {
        if (page === "...") {
          return (
            <span
              key={i}
              className="flex items-center justify-center w-10 h-10 text-slate-400"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            onClick={() => onPageChange(page as number)}
            key={i}
            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors
               dark:bg-[#27272A] cursor-pointer
                    ${
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-[#3f3f46]"
                    }
                    `}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-[#27272A]
         text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed 
         cursor-pointer"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </nav>
  );
};

export default CustomPagination;
