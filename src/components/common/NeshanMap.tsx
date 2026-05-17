"use client";

import { useRef, useState } from "react";
import NeshanMapReact, {
  NeshanMapRef,
} from "@neshan-maps-platform/react-openlayers";
import { Map as OLMap } from "@neshan-maps-platform/ol";
import { fromLonLat, toLonLat } from "@neshan-maps-platform/ol/proj";

type Coords = {
  lat: number;
  lng: number;
};

export default function MapView() {
  const mapRef = useRef<NeshanMapRef>(null);

  const [position, setPosition] = useState<Coords>({
    lat: 35.715298,
    lng: 51.404343,
  });
  console.log("position", position);

  const onInit = (map: OLMap) => {
    const view = map.getView();

    view.setCenter(fromLonLat([position.lng, position.lat]));
    view.setZoom(15);

    map.on("click", (evt) => {
      const [lon, lat] = toLonLat(evt.coordinate);
      setPosition({ lat, lng: lon });
    });
  };

  return (
    <div className="relative w-full h-full rounded-[24px] overflow-hidden">
      <NeshanMapReact
        ref={mapRef}
        options={{
          key: process.env.NEXT_PUBLIC_MAP_KEY!,
          mapType: "dreamy",
        }}
        onInit={onInit}
        style={{ width: "100%", height: "100%" }}
      />

      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2
       bg-white/70 rounded-xl px-4 py-2 rounded shadow text-sm"
      >
        📍 {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
      </div>
    </div>
  );
}
