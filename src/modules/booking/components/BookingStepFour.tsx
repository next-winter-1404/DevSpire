"use client";

import { useState } from "react";

const BookingStepFour = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full 
          animate-spin mb-6"
      />

      <p className="text-lg font-semibold text-gray-700">
        در حال انتقال به درگاه پرداخت
      </p>

      <p className="mt-2 text-sm text-gray-500 animate-pulse">
        لطفاً چند لحظه صبر کنید…
      </p>
    </div>
  );
};

export default BookingStepFour;
