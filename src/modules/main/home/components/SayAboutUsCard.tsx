import Image from "next/image";
import Person1 from "../../../../../public/images/home/person1.png";
import Virgule from "../../../../../public/icons/Virgule";

type CardData = {
  data: {
    id: number;
    title: string;
    caption: string;
    created_at: string;
  };
};

const SayAboutUsCard = ({ data }: CardData) => {
  return (
    <div
      className="flex flex-col justify-between gap-6 h-60 p-6 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]   
    dark:bg-[#262626] dark:border-[#404040]"
    >
      <div className="flex justify-between">
        <Image
          src={Person1}
          alt="person1"
          width={100}
          height={100}
          className="rounded-[8px]"
        />
        <Virgule />
      </div>

      <p
        className="font-regular text-[16px] text-[#1E2022]   
      dark:text-[#A3A3A3]"
      >
        {data.caption}
      </p>

      <div className="flex gap-2">
        <span className="font-bold text-[14px] text-[#1E2022]   dark:text-[#E4E4E4]">
          {data.title}
        </span>
        <span className="font-regular text-[14px] text-[#777777]   dark:text-[#A3A3A3]">
          -
        </span>
        <span className="font-regular text-[14px] text-[#777777]   dark:text-[#A3A3A3]">
          {data.created_at.slice(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default SayAboutUsCard;
