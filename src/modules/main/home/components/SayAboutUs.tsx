import React from "react";
import SayAboutUsSlider from "./SayAboutUsSlider";
import SayAboutUsTop from "./SayAboutUsTop";
import { apiFetch } from "@/core/Server-fetch/fetchApi";


const SayAboutUs = async () => {

  const data = await apiFetch("/comments", {
    params: {
      limit: 5,
    },
    next: {
      revalidate: 60,
    },
  });

  return (
    <div className="flex justify-center w-full mt-30 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col items-start gap-8 w-full">
        <SayAboutUsTop/>
        <SayAboutUsSlider data={data.comments}/>
      </div>
    </div>
  );
};

export default SayAboutUs;
