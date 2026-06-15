"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CatalogModalProps = {
  isOpen: boolean;
  onClose: () => void;
  photos: string[];
};

export default function CatalogModal({
  isOpen,
  onClose,
  photos,
}: CatalogModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="bg-background w-full max-w-6xl rounded-2xl shadow-2xl p-6 relative overflow-y-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">کاتالوگ تصاویر</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos?.map((src, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl h-40"
                onClick={() => setSelectedImage(src)}
              >
                <Image
                  src={src}
                  alt={`catalog-${index}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="preview"
              fill
              className="object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
