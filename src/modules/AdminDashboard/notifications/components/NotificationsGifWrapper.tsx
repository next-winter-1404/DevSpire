"use client";

import dynamic from "next/dynamic";

const NotifGif = dynamic(() => import("./NotificationsGif"), {
  ssr: false,
  loading: () => (
    <p className="text-center mx-auto text-foreground font-bold">
      درحال بارگزاری...
    </p>
  ),
});
const NotificationsGifWrapper = () => {
  return <NotifGif />;
};

export default NotificationsGifWrapper;
