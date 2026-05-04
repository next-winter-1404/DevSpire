import "./[locale]/globals.css";
import Link from "next/link";
import { QuestionMarkCircledIcon, ArrowLeftIcon } from "@radix-ui/react-icons";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 ">
      <div className="bg-muted p-6 rounded-[2.5rem] mb-3 border border-border relative ">
        <QuestionMarkCircledIcon className="w-20 h-20 text-primary opacity-80" />
      </div>

      <h1 className="text-7xl md:text-9xl font-black text-primary mb-6 drop-shadow-sm">
        404
      </h1>
      <h2 className="text-2xl font-bold text-foreground ">
        The page you were looking for was not found !
      </h2>
    </div>
  );
}
