"use client";

import { useState } from "react";

export default function UserAvatarUploader() {
  const [preview, setPreview] = useState<string | null>(null);

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-24 h-24 rounded-full overflow-hidden border">
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            عکس
          </div>
        )}
      </div>

      <label className="text-primary text-sm cursor-pointer">
        تغییر تصویر
        <input type="file" className="hidden" accept="image/*" onChange={onSelect} />
      </label>
    </div>
  );
}
