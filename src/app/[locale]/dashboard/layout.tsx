import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "داشبورد",
  robots: {
    index: false,
    follow: false,
  },
};

const layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default layout;
