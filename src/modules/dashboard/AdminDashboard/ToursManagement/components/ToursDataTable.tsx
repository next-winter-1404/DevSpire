import { TTour } from "../../../../../components/common/types";
import ToursDataTableRow from "./ToursDataTableRow";

interface IProps {
  data: TTour[];
}

const ToursDataTable = ({ data }: IProps) => {
  return (
    <table className="flex flex-col gap-4">
      <thead className="hidden font-bold text-[#1E2022]   md:flex">
        <tr className="w-full px-6">
          <td className="w-[40%] text-[#1E2022]   dark:text-[#E4E4E4]">
            <span></span>
          </td>
          <td className="w-[30%] text-[#1E2022]   dark:text-[#E4E4E4]">
            <span></span>
          </td>
          <td className="w-[30%] text-[#1E2022]   dark:text-[#E4E4E4]">
            <span></span>
          </td>
          <td className="text-[#1E2022]   dark:text-[#E4E4E4]">
            <span></span>
          </td>
        </tr>
      </thead>
      <tbody className="flex flex-col">
        {data?.map((item) => (
          <ToursDataTableRow item={item} key={item.id} />
        ))}
      </tbody>
    </table>
  );
};

export default ToursDataTable;
