"use client";

import { Link } from "@/i18n/routing";
import Date from "../../../../../public/icons/Date";
import Clock from "../../../../../public/icons/Clock";
import { BookOpen, ArrowLeft } from "lucide-react";

type IBlogCard = {
  item: {
    id: number;
    title: string;
    caption: string;
    estimated_reading_time: string;
    author_id: number;
    created_at: string;
    category_id: number;
  };
};

const BlogCard = ({ item }: IBlogCard) => {
  return (
    <div
      className="group w-[444px] bg-white border border-gray-200 rounded-[24px] overflow-hidden 
    transition-all duration-300 ease-in-out cursor-pointer
    hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-2
          dark:!bg-[#27272A] dark:!border-[#333333] dark:hover:shadow-none"


    >
      <div className="relative w-full h-56 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">

        <BookOpen
          className="absolute bottom-6 left-6 w-20 h-20 text-white/20
         transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
        />
      </div>

      <div className="flex flex-col gap-4 p-8">
        <div className="flex flex-col gap-3">
          <Link
            href={`blogs/${item.id}`}
            className="font-bold text-[20px] text-gray-900 leading-snug
                       dark:text-white transition-colors group-hover:text-blue-600"
          >
            {item.title}
          </Link>
          <p className="font-regular text-[16px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
            {item.caption}
          </p>
        </div>

        <div className="w-full h-[1px] bg-gray-100 dark:bg-[#333333] my-2"></div>

        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-[14px]">{item.estimated_reading_time}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
              <Date className="w-4 h-4" />
              <span className="text-[14px]">
                {item.created_at.slice(0, 10)}
              </span>
            </div>
          </div>

          <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-blue-50 p-2 rounded-full dark:bg-white/10">
            <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
