import { Link } from "@/i18n/routing";

export interface IBreadCrumbItem {
  label: string;
  href?: string;
}

export type TBreadCrumbPros = {
  items: IBreadCrumbItem[];
};

const BreadCrumbs = ({ items }: TBreadCrumbPros) => {
  return (
    <nav
      className=" text-[14px] md:text-[16px] flex items-center gap-3 overflow-x-auto scroll-smooth whitespace-nowrap
    no-scrollbar "
    >
      {items.map((item, index) => {
        const isLast = index == items.length - 1;

        return (
          <div key={index} className="flex items-center gap-3">
            {isLast || !item.href ? (
              <span className="font-bold text-[#000000] dark:text-[#FAFAFA]">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors duration-200 text-[#777777] "
              >
                {item.label}
              </Link>
            )}

            {!isLast && (
              <span className="text-[#777777]  md:text-[20px] ">&gt;</span>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;
