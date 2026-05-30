import NotificationsList from '@/components/common/dashboards/NotificationsList';
import NotificationsTop from '@/components/common/dashboards/NotificationsTop'
import { TNotificationsResponse } from '@/components/common/types';



interface IProps{
    data: TNotificationsResponse;
}

const NotificationsView = ({data}: IProps) => {

    return (
        <div className="flex flex-col gap-4 p-6">
            <NotificationsTop/>
            <NotificationsList data={data}/>
        </div>
    )

}

export default NotificationsView