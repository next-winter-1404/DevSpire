import CategoryDetailView from "@/modules/AdminDashboard/CategoryDetail/views/CategoryDetailView";



const page = ({ params }: { params: Promise<{ id: string }> }) => {


    return (
        <div>
            <CategoryDetailView params={params}/>
        </div>
    )

}

export default page

