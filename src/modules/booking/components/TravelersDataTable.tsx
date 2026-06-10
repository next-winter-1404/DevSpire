"use client";

import { getAgeRange } from "@/utils/helper/getAgeRange";
import { IPassenger, TravelerDetail } from "../types";
import { useLocale } from "next-intl";
import moment from "jalali-moment";
import { useTranslations } from "next-intl";

interface Iprops {
  traveler_details: TravelerDetail[];
  totalPrice: number;
}

const TravelersDataTable = ({ traveler_details, totalPrice }: Iprops) => {
  const t = useTranslations("booking.review");

  const locale = useLocale();
  return (
    <div className="w-full">
      <div className="hidden lg:block w-full rounded-[24px] border border-[#DDDDDD] overflow-hidden">
        <table className="w-full table-auto">
          <thead className="text-[16px] text-foreground">
            <tr className="text-right font-bold">
              <th className="p-4"> {t("ageRange")}</th>
              <th className="p-4">{t("fullName")}</th>
              <th className="p-4">{t("gender")}</th>
              <th className="p-4">{t("nationalIdPassport")}</th>
              <th className="p-4">{t("birthDate")}</th>
              <th className="p-4 text-center">{t("services")}</th>
              <th className="p-4 text-center">{t("servicePrice")}</th>
              <th className="p-4">{t("price")}</th>
            </tr>
          </thead>

          <tbody className="text-[16px] text-foreground">
            {traveler_details.map((item, i) => (
              <tr key={i} className="border-t border-[#DDDDDD]">
                <td className="p-4 whitespace-nowrap">
                  {getAgeRange(item.birthDate)}
                </td>
                <td className="p-4 whitespace-nowrap">
                  {item.firstName} {item.lastName}
                </td>
                <td className="p-4 whitespace-nowrap">
                  {item.gender === "male" ? t("male") : t("female")}
                </td>
                <td className="p-4 whitespace-nowrap">{item.nationalId}</td>
                <td className="p-4 whitespace-nowrap">
                  {locale == "fa"
                    ? moment(item.birthDate).locale("fa").format("YYYY/MM/DD")
                    : moment(item.birthDate).locale("en").format("YYYY/MM/DD")}
                </td>
                <td className="p-4 text-center whitespace-nowrap">-</td>
                <td className="p-4 text-center whitespace-nowrap">-</td>
                <td className="p-4 whitespace-nowrap">
                  {(totalPrice / traveler_details.length).toLocaleString()}{" "}
                  {t("toman")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden flex flex-col gap-3">
        {traveler_details.map((item, i) => (
          <div
            key={i}
            className="rounded-[24px] border border-[#DDDDDD] bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[16px] font-bold text-gray-900">
                  {item.firstName} {item.lastName}
                </div>

                <div className="mt-1 text-sm text-gray-600">
                  <span className="font-medium">{t("ageRange")}:</span>
                  {getAgeRange(item.birthDate)}
                </div>

                <div className="mt-1 text-sm text-gray-600">
                  <span className="font-medium">{t("gender")}:</span>
                  {item.gender === "male" ? t("male") : t("female")}


                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-600">{t("price")}</div>
                <div className="text-[16px] font-bold text-gray-900">
                  {(totalPrice / traveler_details.length).toLocaleString()}{" "}
                  {t("toman")}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-700">
              <div className="flex justify-between gap-4">
                <span className="font-medium text-gray-600">
                  {t("nationalIdPassport")}
                </span>

                <span className="whitespace-nowrap">{item.nationalId}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-medium text-gray-600">{t("birthDate")}</span>
                <span className="whitespace-nowrap">
                  {locale == "fa"
                    ? moment(item.birthDate).locale("fa").format("YYYY/MM/DD")
                    : moment(item.birthDate).locale("en").format("YYYY/MM/DD")}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-medium text-gray-600">{t("services")}</span>
                <span>-</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-medium text-gray-600">{t("servicePrice")}</span>
                <span>-</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelersDataTable;
