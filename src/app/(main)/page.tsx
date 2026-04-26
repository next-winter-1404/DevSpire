import HeroSection from "@/components/HeroSection/HeroSection";
import Categories from "@/components/Categories/Categories";
import SpecialOffers from "@/components/SpecialOffers/SpecialOffers";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import RentVilla from "@/components/RentVilla/RentVilla";
import BestChoice from "@/components/BestChoice/BestChoice";
import FeaturesSec from "@/components/FeaturesSec/FeaturesSec";
import NeedHelp from "@/components/NeedHelp/NeedHelp";
import SayAboutUs from "@/components/SayAboutUs/SayAboutUs";


export default function Landing() {
  return(
    <div>
      <HeroSection/>
      <Categories/>
      <SpecialOffers/>
      <WhyChooseUs/>
      <RentVilla/>
      <BestChoice/>
      <FeaturesSec/>
      <NeedHelp/>
      <SayAboutUs/>
    </div>
  ) 
}
