"use client";

import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useLocale, useTranslations } from "next-intl";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  placeholder?: string;
  options: Option[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const CustomSelect = ({
  placeholder,
  options,
  defaultValue,
  onValueChange,
  className,
}: CustomSelectProps) => {
  const locale = useLocale();
  const [selectedValue, setSelectedValue] = React.useState<string>(
    defaultValue || "",
  );
  const t = useTranslations("common.select");
  const onSelect = (value: string) => {
    if (value == "clearFilter") {
      setSelectedValue("");
      if (onValueChange) {
        onValueChange("");
      }
    } else {
      setSelectedValue(value);
      if (onValueChange) onValueChange(value);
    }
  };

  return (
    <Select.Root
      dir={locale == "fa" ? "rtl" : "ltr"}
      value={selectedValue}
      onValueChange={onSelect}
    >
      <Select.Trigger
        className={`
          flex items-center justify-between w-full bg-[#F5F5F5] dark:bg-[#3F3F46] 
          border-none rounded-[40px] py-3 px-5 text-right
          outline-none text-[#777777] dark:text-gray-300 text-[16px]
          focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black
          data-[placeholder]:text-[#777777] ${className}
        `}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180 text-[#1E2022]" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={5}
          className="
            w-[var(--radix-select-trigger-width)] bg-[#ffff] dark:bg-[#3F3F46] 
            rounded-2xl shadow-lg z-50 overflow-hidden border dark:border-gray-700
          "
        >
          <Select.Viewport className="p-2">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="
                  text-right text-[15px] p-2 pr-8 rounded-md relative select-none
                  text-gray-800 dark:text-gray-200 
                  data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-600 
                  data-[highlighted]:outline-none cursor-pointer
                "
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2 top-1/2 -translate-y-1/2">
                  <CheckIcon className="w-4 h-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
            {selectedValue && placeholder && (
              <Select.Item
                value="clearFilter"
                className="
                  text-right text-[15px] p-2 pr-8 rounded-md relative select-none
                  text-gray-800 dark:text-gray-200 
                  data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-600 
                  data-[highlighted]:outline-none cursor-pointer
                "
              >
                <Select.ItemText> {t("clearFilter")} </Select.ItemText>
                <Select.ItemIndicator className="absolute right-2 top-1/2 -translate-y-1/2">
                  <CheckIcon className="w-4 h-4" />
                </Select.ItemIndicator>
              </Select.Item>
            )}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
