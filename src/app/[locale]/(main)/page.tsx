import HeroSection from "@/modules/landing/components/HeroSection";
import Categories from "@/modules/landing/components/Categories";
import SpecialOffers from "@/modules/landing/components/SpecialOffers";
import WhyChooseUs from "@/modules/landing/components/WhyChooseUs";
import RentVilla from "@/modules/landing/components/RentVilla";
import BestChoice from "@/modules/landing/components/BestChoice";
import FeaturesSec from "@/modules/landing/components/FeaturesSec";
import NeedHelp from "@/modules/landing/components/NeedHelp";
import SayAboutUs from "@/modules/landing/components/SayAboutUs";


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
