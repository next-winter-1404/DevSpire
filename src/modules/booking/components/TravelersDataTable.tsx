import { IPassenger } from "../types";

interface Iprops {
  traveler_details: IPassenger[];
  basePrice: number;
}
const TravelersDataTable = ({ traveler_details, basePrice }: Iprops) => {
  return (
    <div className="w-full rounded-[24px] border border-[#DDDDDD]">
      <table className="w-full  table-auto">
        <thead className="text-[16px] text-foreground ">
          <tr className="text-right font-bold ">
            <th className="p-4 ">بازه سنی</th>
            <th className="p-4 ">نام و نام خانوادگی</th>
            <th className="p-4 ">جنسیت</th>
            <th className="p-4 ">کد ملی / شماره / پاسپورت</th>
            <th className="p-4">تاریخ تولد</th>
            <th className="p-4 text-center ">خدمات</th>
            <th className="p-4 text-center ">مبلغ خدمات</th>
            <th className="p-4 ">قیمت</th>
          </tr>
        </thead>
        <tbody className="text-[16px] text-foreground ">
          {traveler_details.map((item, i) => {
            return (
              <tr key={i} className="border-t border-[#DDDDDD]">
                <td className="p-4  whitespace-nowrap">بزرگسال</td>
                <td className="p-4  whitespace-nowrap">
                  {item.firstName}
                  {item.lastName}
                </td>
                <td className="p-4  whitespace-nowrap">
                  {item.gender == "male" ? "مرد" : "زن"}
                </td>
                <td className="p-4  whitespace-nowrap">{item.nationalId}</td>
                <td className="p-4  whitespace-nowrap">
                  {item.birthDate.toString()}
                </td>
                <td className="p-4 text-center whitespace-nowrap">-</td>
                <td className="p-4 text-center whitespace-nowrap">-</td>
                <td className="p-4  whitespace-nowrap">
                  {basePrice.toLocaleString()} تومان
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TravelersDataTable;
