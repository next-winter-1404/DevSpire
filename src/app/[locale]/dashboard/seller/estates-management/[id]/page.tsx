import { useRouter } from '@/i18n/routing'
import EstateManagementEditV from '@/modules/sellerDashboard/estateManagementEdit/views/EstateManagementEditV'
import React from 'react'



const page = () => {

    const house = useRouter().state?.user

    return (
        <div>
            <EstateManagementEditV/>
        </div>
    )

}

export default page