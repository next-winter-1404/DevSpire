import "./[locale]/globals.css";

import { HomeIcon, UpdateIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex min-h-screen w-full flex-col items-center 
    justify-center bg-background/80 backdrop-blur-md"
    >
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute h-32 w-32 animate-ripple rounded-full bg-primary/20"></div>
        <div
          className="absolute h-32 w-32 animate-ripple rounded-full bg-primary/10"
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className="z-10 flex h-20 w-20 animate-float items-center justify-center rounded-full
         bg-primary text-primary-foreground shadow-2xl"
        >
          <HomeIcon className="h-10 w-10" />
        </div>

        <div className="mt-12 flex items-center gap-3 rounded-2xl bg-card px-6 py-3 shadow-sm border border-border">
          <UpdateIcon className="h-5 w-5 animate-spin text-primary" />
          <span className="text-base font-semibold text-foreground">
            در حال جستجوی بهترین نتایج...
          </span>
        </div>
      </div>
    </div>
  );
}
