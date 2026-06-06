import TourManagementDetailView from "@/modules/AdminDashboard/TourManagementDetail/views/TourManagementDetailView"



const page = ({ params }: { params: Promise<{ id: string }> }) => {

    return (
        <div>
            <TourManagementDetailView params={params}/>
        </div>
    )

}

export default page