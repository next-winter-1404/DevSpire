import UserInfoTabs from "../components/UserInfoTabs";

export default function UserInfoView() {
  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-[#F5F5F5] border border-[#DDDDDD] rounded-[40px] dark:bg-[#404040] dark:border-[#777777]">

      <h1 className="text-right text-[24px] font-bold leading-none text-[#1E2022] dark:text-white">
        اطلاعات کاربری
      </h1>

      <UserInfoTabs />

    </div>
  );
}
