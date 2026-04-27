import Image from "next/image";

type Tprops = {
  title: string;
  location: string;
};
const DetailTitle = ({ title, location }: Tprops) => {
  return (
    <div className="w-full flex flex-col items-start gap-3">
      <h2 className="text-foreground text-[32px] font-bold">{title}</h2>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/fastReservePage/location2.png"
          alt="location"
          width={17}
          height={17}
        />
        <p className="text-[#777777] text-[16px]">{location}</p>
      </div>
    </div>
  );
};

export default DetailTitle;
