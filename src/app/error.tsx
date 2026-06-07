"use client";

import "./[locale]/globals.css";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <div className="bg-destructive/10 p-6 rounded-[2rem] mb-6 border border-destructive/20">
        <ExclamationTriangleIcon className="w-16 h-16 text-destructive animate-pulse" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        Something went Wrong !
      </h2>
      {/* <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-loose">
        Error : {error.message}
      </p> */}

      <div className="flex flex-col sm:flex-row gap-4  ">
        <button
          onClick={() => reset()}
          className="bg-primary text-primary-foreground px-12 py-3.5 rounded-full hover:opacity-90 
          transition-all duration-300 font-medium shadow-lg shadow-primary/20 flex items-center justify-center 
          gap-2 hover:-translate-y-1"
        >
          <ReloadIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
