import React from "react";
import SayAboutUsSlider from "./SayAboutUsSlider";
import SayAboutUsTop from "./SayAboutUsTop";

const SayAboutUs = () => {

  return (
    <div className="flex justify-center w-full mt-30 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col items-start gap-8 w-full">
        <SayAboutUsTop/>
        <SayAboutUsSlider/>
      </div>
    </div>
  );
};

export default SayAboutUs;
