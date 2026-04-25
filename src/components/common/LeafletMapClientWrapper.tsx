"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <div>در حال بارگذاری نقشه...</div>,
});

export default function LeafletMapClientWrapper() {
  return <LeafletMap />;
}
