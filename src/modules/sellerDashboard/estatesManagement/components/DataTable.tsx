import { IDataTableHeaderItem, THouse } from "@/components/common/types"
import TableRow from "./TableRow"


interface IProps {
  dataTableHeaderItems: IDataTableHeaderItem[]
  houses: THouse[];
}


const DataTable = ({dataTableHeaderItems, houses}:IProps) => {

    return (
        <div className="flex flex-col gap-4 p-6 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]   
        dark:bg-[#262626] dark:border-[#777777]">
            <div className="flex w-full px-6">
                {
                    dataTableHeaderItems.map((item) => (
                        <span key={item.id} className={item.className}>{item.label}</span>
                    ))
                }
            </div>
            <div>
                {
                    houses?.map((item) => (
                        <TableRow item={item} key={item.id}/>
                    ))
                }
            </div>
        </div>
    )

}

export default DataTable