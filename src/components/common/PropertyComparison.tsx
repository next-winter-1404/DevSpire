"use client";
import React from "react";
import {
  MapPin,
  BedDouble,
  Bath,
  Car,
  Users,
  TreeDeciduous,
  Star,
  MessageCircle,
  Tag,
  Wallet,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";

import vsAnimation from "../../../public/lottie/Compare.json";
import Lottie from "react-lottie";
import { useLocale, useTranslations } from "next-intl";

export interface ICompareProperty {
  id: number;
  title: string;
  address: string;
  rate: string;
  discounted_price: string;
  price: string;
  tags: string;
  capacity: number;
  location: string;
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string | null;
  num_comments: number;
  transaction_type: string;
  sellerName: string;
  caption: string;
}

interface Props {
  properties: ICompareProperty[];
}

const formatPrice = (price: string) => {
    const locale = useLocale();
const t = useTranslations("common.compare");

  const formatted =
    locale === "fa"
      ? new Intl.NumberFormat("fa-IR").format(Number(price))
      : new Intl.NumberFormat("en-US").format(Number(price));

  return `${formatted} ${t("currency")}`;
};


const formatType = (type: string) => {  const t = useTranslations("compare");

  switch (type) {
    case "mortgage":
      return "رهن";
    case "rental":
      return "اجاره";
    case "reservation":
      return "رزرو";
    default:
      return "خرید و فروش";
  }
};

const PropertyComparison: React.FC<Props> = ({ properties }) => {
  if (!properties || properties.length !== 2) return null;
const t = useTranslations("common.compare");
  const locale = useLocale();
  const [prop1, prop2] = properties;

  const features = [
    {
      label: t("features.transactionType"),
      icon: Wallet,
      val1: formatType(prop1.transaction_type),
      val2: formatType(prop2.transaction_type),
    },
    {
      label: t("features.rooms"),
      icon: BedDouble,
      val1: prop1.rooms,
      val2: prop2.rooms,
    },
    {
      label: t("features.bathrooms"),
      icon: Bath,
      val1: prop1.bathrooms,
      val2: prop2.bathrooms,
    },
    {
      label: t("features.parking"),
      icon: Car,
      val1: prop1.parking,
      val2: prop2.parking,
    },
    {
      label: t("features.capacity"),
      icon: Users,
      val1: `${prop1.capacity} ${t("person")}`
,
      val2: `${prop2.capacity} ${t("person")}`
,
    },
    {
      label: t("features.yard"),
      icon: TreeDeciduous,
      val1: prop1.yard_type ? t(`yard.${prop1.yard_type}`) : t("yard.none")
,
      val2: prop2.yard_type ? t(`yard.${prop1.yard_type}`) : t("yard.none")
,
    },
    {
      label: t("features.comments"),
      icon: MessageCircle,
      val1: prop1.num_comments,
      val2: prop2.num_comments,
    },
  ];

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: vsAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="md:w-[90%] mx-auto w-full relative">
      <div
        className="bg-background rounded-3xl shadow-xl 
      border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <div
          className="sticky top-0 z-30 bg-background backdrop-blur-md 
        border-b border-slate-200 dark:border-slate-800 shadow-sm relative"
        >
          <div
            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 
          z-40 w-14 h-14 md:w-35 md:h-35 bg-white dark:bg-slate-900 rounded-full 
          shadow-xl border-4 border-[#777777]/20 dark:border-slate-800 flex items-center 
          justify-center overflow-hidden"
          >
            <Lottie options={defaultOptions} width={"100%"} height={"100%"} />
          </div>

          <div className="grid grid-cols-2 divide-x divide-x-reverse divide-slate-200 dark:divide-slate-800">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="p-4 md:p-6 flex flex-col items-center text-center"
              >
                <div className="w-full aspect-video md:aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative rounded-2xl mb-4 flex items-center justify-center overflow-hidden group shadow-inner">
                  <Image
alt={t("propertyImageAlt")}
                    src={"/images/fastReservePage/NoImage.png"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-yellow-500 shadow-sm">
                    <Star fill="currentColor" size={14} />
                    <span>{prop.rate}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] md:text-xs font-semibold mb-2">
                  <Tag size={12} />
                  <span className="uppercase">{prop.tags}</span>
                </div>

                <h3 className="text-base md:text-xl font-bold text-slate-800 dark:text-white mb-1 line-clamp-1">
                  {prop.title}
                </h3>

                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs md:text-sm mb-4">
                  <MapPin size={14} />
                  <span className="line-clamp-1">{prop.address}</span>
                </div>

                <div
                  className="mt-auto w-full p-3 bg-slate-50 dark:bg-slate-800/50
                 rounded-xl border border-slate-100 dark:border-slate-800"
                >
                  {prop.discounted_price !== prop.price && (
                    <div
                      className="md:text-[20px] text-slate-400 line-through
                     decoration-red-500/50 mb-0.5"
                    >
                      {formatPrice(prop.price)}
                    </div>
                  )}
                  <div
                    className="text-base md:text-[20px] font-bold font-extrabold text-green-600
                   dark:text-green-400"
                  >
                    {formatPrice(prop.discounted_price || prop.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <BadgeCheck className="text-blue-500" />
  {t("specifications")}
          </h4>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="grid grid-cols-2 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors relative"
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm items-center gap-1.5 text-xs font-semibold text-slate-500 z-10 hidden md:flex transition-transform hover:scale-105">
                <feature.icon size={14} className="text-indigo-500" />
                {feature.label}
              </div>

              <div className="p-4 text-center border-l border-slate-100 dark:border-slate-800 flex flex-col md:block items-center justify-center">
                <span className="text-[10px] font-bold text-slate-400 md:hidden mb-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {feature.label}
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {feature.val1}
                </span>
              </div>

              <div className="p-4 text-center flex flex-col md:block items-center justify-center">
                <span className="text-[10px] font-bold text-slate-400 md:hidden mb-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {feature.label}
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {feature.val2}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-200 dark:divide-slate-800">
          {[prop1, prop2].map((prop) => (
            <div key={`footer-${prop.id}`} className="p-6">
              <div className="mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
{t("additionalInfo")}                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                  {prop.caption}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/50 dark:to-blue-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shadow-sm">
                  {prop.sellerName.charAt(0)}
                </div>
                <div>
                  <div className="text-xs text-slate-500">  {t("provider")}
</div>
                  <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                    {prop.sellerName}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyComparison;
