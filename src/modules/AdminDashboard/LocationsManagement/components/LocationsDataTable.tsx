import { TLocation } from "../../../../components/common/types"
import LocationsTableRow from "./LocationsTableRow";



interface IProps{
    data: TLocation[];
}

const LocationsDataTable = ({data}: IProps) => {

    return (
        <table className="flex flex-col gap-4">
            <thead className="flex font-bold text-[#1E2022]">
                <tr>
                    <td className="w-104">
                        <span>نام مکان</span>
                    </td>
                    <td className="w-64">
                        <span>عرض جغرافیایی</span>
                    </td>
                    <td className="w-104">
                        <span>طول جغرافیایی</span>
                    </td>
                    <td>
                        <span>عملیات</span>
                    </td>
                </tr>
            </thead>
            <tbody className="flex flex-col">
                {
                    data?.map((item) => (
                        <LocationsTableRow item={item} key={item.id}/>
                    ))
                }
            </tbody>
        </table>
    )

}

export default LocationsDataTable

