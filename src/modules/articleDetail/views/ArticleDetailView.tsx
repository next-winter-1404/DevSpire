import { TArticle } from "@/components/common/types"
import ImageBox from "../components/ImageBox"
import BreadCrumbs from "@/components/common/BreadCrumbs"
import { useTranslations } from "next-intl"
import DetailTabs from "../components/DetailTabs"


interface IProps {
    article: TArticle 
}

const ArticleDetailView = ({article}:IProps) => {

    const t = useTranslations("header")

    return (
        <div className="flex flex-col px-12">
            <div className="mt-10">
                <BreadCrumbs
                    items={[
                        {label: t("home"), href: "/"},
                        {label: t("articles"), href: "/articles"},
                        {label: `${article.title}`}
                    ]} 
                />
            </div> 
            <div className="w-full mt-10   md:mt-8">
                <ImageBox photos={article.photos}/>
            </div>  
            <div className="w-full">
                <h2 className="mt-10 font-bold text-[32px] text-[#1E2022]   md:mt-8">{article.title}</h2>    
                <div className="mt-10">
                    <DetailTabs article={article}/>
                </div>
            </div>
      </div>
    )

}

export default ArticleDetailView