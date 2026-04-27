import HeroSection from "@/components/landing/HeroSection/HeroSection";
import Categories from "@/components/landing/Categories/Categories";
import SpecialOffers from "@/components/landing/SpecialOffers/SpecialOffers";
import WhyChooseUs from "@/components/landing/WhyChooseUs/WhyChooseUs";
import RentVilla from "@/components/landing/RentVilla/RentVilla";
import BestChoice from "@/components/landing/BestChoice/BestChoice";
import FeaturesSec from "@/components/landing/FeaturesSec/FeaturesSec";
import NeedHelp from "@/components/landing/NeedHelp/NeedHelp";
import SayAboutUs from "@/components/landing/SayAboutUs/SayAboutUs";


export default function Landing() {
  return(
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
  ) 
}
