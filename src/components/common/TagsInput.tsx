import { X } from "lucide-react";
import React, { useState, KeyboardEvent } from "react";

interface TagsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function TagsInput({
  value = [],
  onChange,
  placeholder,
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = inputValue.trim();

      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div
      className="flex flex-wrap items-center gap-2 p-2 border
     min-h-[50px] focus-within:border-orange-500
      transition-colors w-full h-12 indent-4 bg-[#FFFFFF] 
             border-[#DDDDDD] rounded-[16px]"
    >
      {value?.map((tag, index) => (
        <span
          key={index}
          className="flex items-center gap-1.5 px-3 py-1 bg-orange-500
           text-white rounded-lg text-sm"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="hover:bg-orange-600 rounded-full p-0.5 transition-colors"
          >
            <X size={16} />
          </button>
        </span>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 bg-transparent outline-none min-w-[120px] 
        text-sm text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}
