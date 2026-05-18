import { IDataTableHeaderItem } from "@/components/common/types"
import TableRow from "./TableRow"




interface IDataTableProps {
  dataTableHeaderItems: IDataTableHeaderItem[]
}

const DataTable = ({dataTableHeaderItems}:IDataTableProps) => {

    return (
        <div className="flex flex-col p-6 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]">
            <div className="flex w-full px-6">
                {
                    dataTableHeaderItems.map((item) => (
                        <span key={item.id} className={item.className}>{item.label}</span>
                    ))
                }
            </div>
            <div>
                {
                    <TableRow/>
                }
            </div>
        </div>
    )

}

export default DataTable