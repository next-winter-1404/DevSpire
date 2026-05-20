import { THouse } from '@/components/common/types';
import { apiFetch } from '@/core/Server-fetch/fetchApi';
import EstateManagementEditV from '@/modules/sellerDashboard/estateManagementEdit/views/EstateManagementEditV'
import { notFound } from 'next/navigation';
import React from 'react'



const page = async ({params}:{params: Promise<{ id: string }>}) => {

    const { id } = await params;
    const param = parseInt(id);
    if (!param) {
        notFound();
    }
    const data = await apiFetch<THouse | null>(`/houses/${param}`, {
        next: { revalidate: 60 * 2 },
    });
    if (!data) notFound();

    return (
        <div>
            <EstateManagementEditV house={data}/>
        </div>
    )

}

export default page