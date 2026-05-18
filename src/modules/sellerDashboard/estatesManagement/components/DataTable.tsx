import { IDataTableHeaderItem, TUserHouse } from "@/components/common/types"
import TableRow from "./TableRow"


interface IProps {
  dataTableHeaderItems: IDataTableHeaderItem[]
  houses: TUserHouse[];
}


const DataTable = ({dataTableHeaderItems, houses}:IProps) => {

    return (
        <div className="flex flex-col gap-4 p-6 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]">
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