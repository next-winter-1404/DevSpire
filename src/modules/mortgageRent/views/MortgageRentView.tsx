"use client"
import BreadCrumbs from "@/components/common/BreadCrumbs"
import { useTranslations } from "next-intl"
import Filters from "../components/Filters"
import MortgageRentList from "../components/MortgageRentList"
import { useState } from "react"
import CustomPagination from "@/components/common/CustomPagination"
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation"


const MortgageRentView = () => {

    const t = useTranslations("header")
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") ?? "1"),
    );

    const onPageChange = (page: number) => {
    if (currentPage == page) return;
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathName}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col px-12">
            <div className="mt-10">
                <BreadCrumbs
                items={[
                {label: t("home"), href: "/"},
                {label: t("mortgageAndRent"), href: "/mortgage-rent"}
                ]} 
                />
            </div>
            <Filters/>
            <MortgageRentList/>
            <div className="mt-10">
                <CustomPagination currentPage={currentPage} totalPages={2} onPageChange={onPageChange}/>
            </div>
        </div>
    )

}

export default MortgageRentView