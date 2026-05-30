"use client";
import Lottie from "react-lottie";
import notif from "../../../../../public/lottie/Notifications.json";
const NotificationsGif = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notif,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full h-full ">
      <Lottie options={defaultOptions} width={"100%"} height={"100%"} />
    </div>
  );
};

export default NotificationsGif;
