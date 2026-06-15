"use client";
import notif from "../../../../../../public/lottie/Notifications.json";
import Lottie from "lottie-react";
const NotificationsGif = () => {
  return (
    <div className="w-full h-full ">
      <Lottie animationData={notif} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default NotificationsGif;
