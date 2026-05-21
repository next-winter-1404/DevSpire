import React from 'react'
import Tabs from '../components/Tabs'
import Top from '../components/Top'
import { THouse } from '@/components/common/types'

interface IProps{
    house: THouse
}

const EstateManagementEditV = ({house}:IProps) => {

    return (
        <div className="flex flex-col gap-8">
            <Top house={house}/>
            <Tabs house={house}/>
        </div>
    )

}

export default EstateManagementEditV