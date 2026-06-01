import NotificationsDataTable from '@/components/common/sellerDashboard/NotificationsDataTable'
import NotificationsTop from '@/components/common/sellerDashboard/NotificationsTop'
import { TNotification } from '@/components/common/types';



interface IProps{
    notifications: TNotification[];
}

const NotificationsView = ({notifications}: IProps) => {


    return (
        <div className="flex flex-col gap-4">
            <NotificationsTop/>
            <NotificationsDataTable notifications={notifications}/>
        </div>
    )

}

export default NotificationsView