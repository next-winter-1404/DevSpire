import React from "react";
import Top from "../components/Top";
import { THouse } from "@/components/common/types";

interface IProps {
  house?: THouse;
}

const EstateManagementEditV = ({ house }: IProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Top house={house} />
    </div>
  );
};

export default EstateManagementEditV;
