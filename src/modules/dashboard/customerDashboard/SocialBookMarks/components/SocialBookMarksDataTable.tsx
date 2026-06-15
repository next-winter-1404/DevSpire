import { useTranslations } from "next-intl";
import { TSocialBookMark } from "../../../../../components/common/types";
import SocBookMarksDataTableRow from "./SocBookMarksDataTableRow";

interface IProps {
  data: TSocialBookMark[];
}

const SocialBookMarksDataTable = ({ data }: IProps) => {
  const t = useTranslations("customerDashboard.socialBookMarks");

  return (
    <table className="flex flex-col gap-4">
      <thead className="hidden font-bold text-[#1E2022]   md:flex">
        <tr className="w-full px-6">
          <td className="w-[98%] text-[#1E2022]   dark:text-[#E4E4E4]">
            <span>{t("socialBookMarkName")}</span>
          </td>
          <td className="text-[#1E2022]   dark:text-[#E4E4E4]">
            <span>{t("actions")}</span>
          </td>
        </tr>
      </thead>
      <tbody className="flex flex-col">
        {data?.map((item) => (
          <SocBookMarksDataTableRow item={item} key={item.id} />
        ))}
      </tbody>
    </table>
  );
};

export default SocialBookMarksDataTable;
