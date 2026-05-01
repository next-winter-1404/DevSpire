import React from 'react'
import Close from '../../../../public/icons/Close';
import { Links } from '@/modules/header/mock/Links';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import ToggleThem from '@/components/common/ToggleTheme';


interface HeaderMenuProps {
  useToggleMenu: () => void;
}


const HeaderMenu = ({ useToggleMenu }: HeaderMenuProps) => {

  const pathname = usePathname()
  const t = useTranslations('header')

  return (
    <div className="flex flex-col items-start gap-8 w-full h-full px-6 bg-[#FFFFFF] absolute top-0 z-48   
    dark:bg-[#404040]">
      <div onClick={useToggleMenu} className='flex justify-end w-full'>
        <Close/>
      </div>
      <div>
        <div>
          <div className="hidden md:block">
            <LanguageSwitcher/>
          </div>
          <div className="hidden md:block">
            <ToggleThem/>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          {
            Links.map((item, index) => (
              <Link 
              key={index} 
              href={item.link}
              className='font-bold text-[#262626]   dark:text-[#E4E4E4]'>
                {t(`${item.title}`)}
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
