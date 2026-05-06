import InCome from "../components/InCome"
import TopCards from "../components/TopCards"

const SellerDashboardView = () => {

    return (
        <div>
            <TopCards/>
            <div className='flex gap-4'>
                <InCome/>
            </div>
        </div>
    )

}

export default SellerDashboardView