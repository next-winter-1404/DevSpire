import SecurityTab from '@/components/common/dashboards/SecurityTab';
import Tabs from '@/components/common/dashboards/Tabs';
import UserInfoTabs from '../components/UserInfoTabs';


const UserInfoView = () => {

    return (
        <div className="flex flex-col gap-8">
            <UserInfoTabs/>
        </div>
    );

};

export default UserInfoView;
