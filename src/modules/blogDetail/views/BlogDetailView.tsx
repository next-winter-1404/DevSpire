import { TBlog } from "@/components/common/types"
import ImageBox from "../components/ImageBox"
import BreadCrumbs from "@/components/common/BreadCrumbs"
import { useTranslations } from "next-intl"
import ReserveInfo from "../components/ReserveInfo"


interface IProps {
    blog: TBlog
}

const BlogDetailView = ({blog}:IProps) => {

    const t = useTranslations("header")

    return (
        <div className="flex flex-col px-12">
            <div className="mt-10">
                <BreadCrumbs
                    items={[
                        {label: t("home"), href: "/"},
                        {label: t("blogs"), href: "/blogs"},
                        {label: `${blog.title}`}
                    ]} 
                />
            </div> 
            <div className="w-full mt-10   md:mt-8">
                <ImageBox photos={blog.photos}/>
            </div>  
            <div className="w-full">
                <h2 className="mt-10 font-bold text-[32px] text-[#1E2022]   md:mt-8">{blog.title}</h2>    
                <div className="mt-10">
                    <ReserveInfo blog={blog}/>
                </div>
            </div>
      </div>
    )

}

export default BlogDetailView