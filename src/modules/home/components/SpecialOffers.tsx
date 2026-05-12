import SpecialOffersSlider from "./SpecialOffersSlider";
import SpecialOffersTop from "./SpecialOffersTop";


const SpecialOffers = () => {
  
  return (
    <div className="flex justify-center mt-30 px-4 sm:px-6 lg:px-10 w-full">
      <div className="flex flex-col gap-8 w-full">
        <SpecialOffersTop/>
        <SpecialOffersSlider/>
      </div>
    </div>
  );
};

export default SpecialOffers;
