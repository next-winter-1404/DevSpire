import { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={` ${className} px-4 sm:px-6 lg:px-10 py-8 sm:py-5 lg:py-10 `}
    >
      {children}
    </div>
  );
};

export default Container;
