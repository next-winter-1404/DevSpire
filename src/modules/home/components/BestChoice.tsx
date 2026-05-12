import BestChoiceSlider from "./BestChoiceSlider";
import BestChoiceTop from "./BestChoiceTop";


const BestChoice = () => {

  return (
    <div className="flex justify-between w-full mt-30 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-8 w-full">
        <BestChoiceTop/>
        <BestChoiceSlider/>
      </div>
    </div>
  );
};

export default BestChoice;
