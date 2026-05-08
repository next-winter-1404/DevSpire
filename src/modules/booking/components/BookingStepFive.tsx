"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const BookingStepFive = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <Image
          src="/images/fastReservePage/successPaid.png"
          alt="Payment Success"
          width={500}
          height={400}
          className="animate-float"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-[24px] font-bold text-foreground"
      >
        پرداخت با موفقیت انجام شد
      </motion.p>
      <div className="  mt-8 flex  flex-col items-start gap-6  md:flex-row md:items-center md:justify-between ">
        <button className="p-2.5 cursor-pointer rounded-[16px] text-[#777777] border border-[#777777]  text-[20px] ">
          بازگشت به صفحه اصلی
        </button>
        <button className="text-[#ffff] text-[20px] bg-primary  p-2.5 cursor-pointer rounded-[16px] ">
          بلیط های من
        </button>
      </div>
    </div>
  );
};

export default BookingStepFive;
