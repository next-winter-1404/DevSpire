import React from 'react'


const DataTable = () => {

    const dataTableHeaderItems = [
        {id:1, label: "نام اقامتگاه", marginRight: "24"},
        {id:2, label: "تاریخ رزرو", marginRight: "64"},
        {id:3, label: "قیمت", marginRight: "64"},
        {id:4, label: "وضعیت", marginRight: "64"},
        {id:5, label: "عملیات", marginRight: "64"}
    ]

    return (
        <div className="flex flex-col">
            <div className="w-full">
                {
                    dataTableHeaderItems.map((item) => (
                        <span className={`mr-[${item.marginRight}px]`}>{item.label}</span>
                    ))
                }
            </div>
            <div></div>
        </div>
    )

}

export default DataTable