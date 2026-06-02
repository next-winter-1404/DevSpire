import { useState } from "react";
import Dots from "../../../../../public/icons/Dots";
import { TLocation } from "../../../../components/common/types"
import LocationActionsMenu from "./LocationActionsMenu";



interface IProps{
    item: TLocation;
}

const LocationsTableRow = ({item}: IProps) => {

    const [isOpenActionsModal, setIsOpenActionsModal] = useState<boolean>(false)

    const handleActionsModal = (value: boolean) => {
        setIsOpenActionsModal(value);
    }


    return(
        <>
            <tr className="flex items-center h-16 border-y border-[#DDDDDD] relative   dark:border-[#777777]">
                <td className="w-104 text-[#1E2022]   dark:text-[#E4E4E4]">
                    <span>{item.areaName ? item.areaName : "فاقد نام"}</span>
                </td>
                <td className="w-64 text-[#1E2022]   dark:text-[#E4E4E4]">
                    <span>{item.lat}</span>
                </td>
                <td className="w-104 text-[#1E2022]   dark:text-[#E4E4E4]">
                    <span>{item.lng}</span>
                </td>
                <td onClick={() => {handleActionsModal(true)}} className="p-1 text-[#1E2022] rounded-[8px] cursor-pointer   
                hover:bg-[#F5F5F5]
                dark:text-[#E4E4E4] dark:hover:bg-[#404040]">
                    <Dots/>
                </td>
                {isOpenActionsModal && <LocationActionsMenu handleActionsModal={handleActionsModal} id={item.id}/>}
            </tr>
        </>
    )

}

export default LocationsTableRow

