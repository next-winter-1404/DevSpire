import { ReactNode } from "react";

const BookingContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full py-8 px-4 bg-[#F5F5F5] dark:bg-[#27272A] rounded-[24px] ">
      {children}
    </div>
  );
};

export default BookingContainer;
