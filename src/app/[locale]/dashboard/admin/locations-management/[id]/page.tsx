import LocManagementDetailView from "@/modules/AdminDashboard/LocManagementDetail/views/LocManagementDetailView";



const page = ({ params }: { params: Promise<{ id: string }> }) => {


    return (
        <div>
            <LocManagementDetailView params={params}/>
        </div>
    )

}

export default page

