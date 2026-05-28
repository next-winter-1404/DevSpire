import { ReactNode } from "react";

const DashboardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full overflow-y-auto scroll-smooth p-5">
      {children}
    </div>
  );
};

export default DashboardContainer;
