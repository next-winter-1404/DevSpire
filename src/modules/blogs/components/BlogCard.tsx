import Image from "next/image"
import House1 from "../../../../public/images/fastReservePage/house1.png"
import { Link } from "@/i18n/routing"
import Date from "../../../../public/icons/Date"
import Clock from "../../../../public/icons/Clock"


type IBlogCard = {
    item:{
        id: number,
        title: string,
        caption: string,
        estimated_reading_time: string,
        author_id: number,
        created_at: string,
        category_id: number
    }
}

const BlogCard = ({item}: IBlogCard) => {

    return (
        <Link href={`blogs/${item.id}`} className="w-[444px] bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px] cursor-pointer 
        hover:bg-[#F5F5F5]
        dark:bg-[#404040] dark:border-[#777777] dark:hover:bg-[#505050]">
            <Image src={House1} alt="article1" className="w-full h-60"/>
            <div className="flex flex-col gap-4 pt-6 pr-8 pb-8 pl-8">
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-[20px] text-[#1E2022]   dark:text-[#F5F5F5]">{item.title}</span>
                    <span className="font-regular text-[16px] text-[#777777]   dark:text-[#E4E4E4]">{item.caption}</span>
                </div>
                <div className="w-full h-[1px] bg-[#DDDDDD] rounded-full   dark:bg-[#777777]"></div>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-[#777777]   dark:text-[#E4E4E4]">
                        <Clock/>
                        <span className="font-regular text-[16px]">{item.estimated_reading_time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#777777]   dark:text-[#E4E4E4]">
                        <Date/>
                        <span className="font-regular text-[16px]">{item.created_at.slice(0,10)}</span>
                    </div>
                </div>
            </div>
        </Link>
    )

}

export default BlogCard