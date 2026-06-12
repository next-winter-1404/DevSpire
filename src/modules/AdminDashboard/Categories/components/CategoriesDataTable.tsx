import { useTranslations } from "next-intl";
import { TCategory } from "../../../../components/common/types";
import CategoriesDataTableRow from "./CategoriesDataTableRow";

interface IProps {
  data: TCategory[];
}

const CategoriesDataTable = ({ data }: IProps) => {
  const t = useTranslations("adminDashboard.categories");

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="hidden md:table-header-group font-bold text-[#1E2022] dark:text-[#E4E4E4]">
          <tr>
            <th className="px-6 py-3 text-start">
              <span>{t("categoryName")}</span>
            </th>

            <th className="px-6 py-3 text-center w-[120px]">
              <span>{t("actions")}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <CategoriesDataTableRow item={item} key={item.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesDataTable;
