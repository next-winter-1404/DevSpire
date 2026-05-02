"use client";

import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import moment from "jalali-moment";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useLocale } from "next-intl";

interface SingleDatePickerProps {
  label?: string;
  onChange: (date: Date | null) => void;
}

export default function CustomDatepicker({
  label,
  onChange,
}: SingleDatePickerProps) {
  const locale = useLocale();
  const [date, setDate] = useState<DateObject | null>(null);
  const isRtl = locale === "fa";

  const handleChange = (selectedDate: DateObject | null) => {
    setDate(selectedDate);
    onChange(selectedDate ? selectedDate.toDate() : null);
  };

  const formatDisplayDate = (dateObj: DateObject | null) => {
    if (!dateObj) return "";
    return moment(dateObj.toDate())
      .locale(locale === "fa" ? "fa" : "en")
      .format("YYYY/MM/DD");
  };

  return (
    <div
      className={`flex flex-col gap-2 w-full ${isRtl ? "text-right dir-rtl" : "text-left dir-ltr"}`}
    >
      {label && (
        <label className=" text-[16px] font-bold text-[#1E2022] dark:text-[#FAFAFA] mb-3">
          {label}
        </label>
      )}

      <DatePicker
        calendar={locale === "fa" ? persian : gregorian}
        locale={locale === "fa" ? persian_fa : gregorian_en}
        calendarPosition="bottom-center"
        value={date}
        onChange={handleChange}
        className={locale === "fa" ? "rmdp-persian" : ""}
        render={(value, openCalendar) => (
          <div
            onClick={openCalendar}
            className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 rounded-[24px] py-3 px-5
            transition-colors cursor-pointer border border-transparent hover:border-gray-200 
            relative outline-none dark:bg-[#3F3F46]  text-sm"
          >
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? "left-4" : "right-4"} `}
            >
              <CalendarIcon className="w-5 h-5 text-gray-400 shrink-0" />
            </div>
            <span
              className={`text-gray-500 font-medium tracking-wider w-full ${isRtl ? "text-right" : "text-left"}`}
            >
              {formatDisplayDate(date) ||
                (locale === "fa" ? "انتخاب تاریخ" : "Select date")}
            </span>
          </div>
        )}
      />
    </div>
  );
}
