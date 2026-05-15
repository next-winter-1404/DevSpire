import { TArticle } from "@/components/common/types"
import ImageBox from "../components/ImageBox"


interface IProps {
    article: TArticle 
}

const ArticleDetailView = ({article}:IProps) => {

    return (
        <div className="flex flex-col">
            <ImageBox photos={article.photos}/>
        </div>
    )

}

export default ArticleDetailView