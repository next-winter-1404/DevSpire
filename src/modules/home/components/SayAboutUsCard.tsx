import Image from 'next/image'
import Virgule from '../../../../public/icons/Virgule'


type CardData = {
  id: number
  image: string;
  quote: string;
  name: string;
  date: string;
};

type Props = {
  className?: string; 
  data: CardData;     
};

const SayAboutUsCard = ({ className, data }: Props) => {
  return (
    <div className={`flex flex-col gap-6 p-6 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]   
    dark:bg-[#262626] dark:border-[#404040] ${className}`}>
      <div className='flex justify-between'>
        <Image 
          src={data.image} 
          alt={data.name} 
          width={100} 
          height={100} 
          className='rounded-[8px]'
        />
        <Virgule/>
      </div>
      
      <p className='font-regular text-[16px] text-[#1E2022]   
      dark:text-[#A3A3A3]'>{data.quote}</p>
      
      <div className='flex gap-2'>
        <span className='font-bold text-[14px] text-[#1E2022]   dark:text-[#E4E4E4]'>{data.name}</span>
        <span className='font-regular text-[14px] text-[#777777]   dark:text-[#A3A3A3]'>-</span>
        <span className='font-regular text-[14px] text-[#777777]   dark:text-[#A3A3A3]'>{data.date}</span>
      </div>
    </div>
  )
}

export default SayAboutUsCard
