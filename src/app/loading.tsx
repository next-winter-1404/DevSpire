import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="relative flex items-center justify-center w-24 h-24 animate-float">
        <div className="absolute inset-0 bg-primary/30 rounded-full animate-ripple"></div>

        <div className="relative flex items-center justify-center w-16 h-16 bg-primary rounded-full text-primary-foreground shadow-xl shadow-primary/30">
          <MagnifyingGlassIcon className="w-8 h-8" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-bold text-foreground">
          در حال جستجوی بهترین‌ها...
        </h3>
        <p className="text-sm text-muted-foreground font-medium">
          لطفا چند لحظه منتظر بمانید
        </p>
      </div>
    </div>
  );
}
