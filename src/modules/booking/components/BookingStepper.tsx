"use client";

import {
  Building2Icon,
  CheckCheck,
  CreditCard,
  ReceiptIcon,
  UsersIcon,
} from "lucide-react";
import { ElementType } from "react";
import * as Progress from "@radix-ui/react-progress";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

interface ISteps {
  id: number;
  title: string;
  icon: ElementType;
}
const BookingStepper = ({ currentStep = 2 }: { currentStep?: number }) => {const t = useTranslations("booking.stepper");

  const locale = useLocale();
  const stpes: ISteps[] = [
    { id: 1, title: t("selectHotel"), icon: Building2Icon },
  { id: 2, title: t("travelerInfo"), icon: UsersIcon },
  { id: 3, title: t("confirmInfo"), icon: CheckCheck },
  { id: 4, title: t("onlinePayment"), icon: CreditCard },
  { id: 5, title: t("ticketIssued"), icon: ReceiptIcon },
  ];
  const totalStep = stpes.length;
  const progressPercent = ((currentStep - 1) / (totalStep - 1)) * 100;
  return (
    <div className="w-full relative  ">
      <div className="absolute right-0 left-0 top-1/2 -translate-y-1/2 z-0">
        <Progress.Root
          value={progressPercent}
          className="relative overflow-x-hidden bg-[#F5F5F5] rounded-full w-full h-2"
        >
          <Progress.Indicator
            className="w-full h-full bg-primary transition-transform ease-in-out duration-500 "
            style={
              locale == "fa"
                ? { transform: `translateX(${100 - progressPercent}%)` }
                : {
                    transform: `translateX(-${100 - progressPercent}%)`,
                  }
            }
          />
        </Progress.Root>
      </div>
      <div className="relative z-10 flex justify-between items-center w-full">
        {stpes.map((item, i) => {
          const isCompleted = currentStep > item.id;
          const isActive = currentStep == item.id;
          const Icon = item.icon;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              <div
                className={`rounded-full relative z-10 p-3 md:p-4.75 transition-colors duration-200 flex justify-center items-center ${
                  isCompleted
                    ? "bg-primary "
                    : isActive
                      ? "bg-[#E6EDF5] "
                      : "bg-[#F5F5F5] "
                } `}
              >
                <Icon
                  className={`w-6 h-6 ${isActive ? "text-primary" : isCompleted ? "text-[#ffff]" : "text-[#777777]"} `}
                />
              </div>

              <h2
                className={`absolute hidden md:block top-full mt-3 text-center whitespace-nowrap text-[16px] ${
                  isActive
                    ? "font-bold text-foreground"
                    : isCompleted
                      ? "font-bold text-primary"
                      : "text-[#777777]"
                }`}
              >
                {item.title}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingStepper;
