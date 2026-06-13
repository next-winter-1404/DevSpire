import React from "react";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import SpecialOffers from "../components/SpecialOffers";
import WhyChooseUs from "../components/WhyChooseUs";
import BestChoice from "../components/BestChoice";
import RentVilla from "../components/RentVilla";
import FeaturesSec from "../components/FeaturesSec";
import NeedHelp from "../components/NeedHelp";
import SayAboutUs from "../components/SayAboutUs";

const HomeView = () => {
  return (
    <div>
      <HeroSection/>
      <Categories/>
      <SpecialOffers/>
      <WhyChooseUs/>
      <BestChoice/>
      <RentVilla/>
      <FeaturesSec/>
      <NeedHelp/>
      <SayAboutUs/>
    </div>
  );
};

export default HomeView;
