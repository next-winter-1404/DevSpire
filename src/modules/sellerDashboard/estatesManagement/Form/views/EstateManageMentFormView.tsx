import { Link } from "@/i18n/routing";
import CurveArrow from "../../../../../../public/icons/CurveArrow";
import EstateManageForm from "../components/EstateManageForm";
import { THouse } from "@/components/common/types";

const EstateManageMentFormView = ({ house }: { house: THouse | null }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="font-bold text-[24px] text-[#1E2022]">مدیریت املاک</h1>
        <Link
          href={"/dashboard/seller/estates-management"}
          className="flex items-center gap-2"
        >
          <span className="font-regular text-[16px] text-[#0D3B66]">
            رفتن به لیست املاک
          </span>
          <CurveArrow className="w-5 h-5 rotate-90" />
        </Link>
      </div>
      <div className="mt-6">{<EstateManageForm house={house} />}</div>
    </div>
  );
};

export default EstateManageMentFormView;
