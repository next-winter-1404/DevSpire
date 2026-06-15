import { Metadata } from "next";

export interface IMetadataItems {
  title?: string;
  description?: string;
  keywords?: string[];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://logo.ir";

export const customMetadataGenerator = ({
  title,
  description,
  keywords,
}: IMetadataItems = {}): Metadata => {
  const pageTitle = title || "لوگو | رهن، اجاره و رزرو ملک";

  const pageDescription =
    description ||
    "لوگو، مرجع جستجو و رزرو انواع ملک برای رهن و اجاره. مشاهده تصاویر، امکانات، موقعیت مکانی و اطلاعات کامل املاک در سراسر ایران.";

  return {
    metadataBase: new URL(SITE_URL),

    title: pageTitle,

    description: pageDescription,

    keywords: keywords || [
      "رهن و اجاره",
      "اجاره آپارتمان",
      "رزرو ملک",
      "اجاره ویلا",
      "املاک",
      "مشاور املاک",
      "لوگو",
    ],

    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      locale: "fa_IR",
      siteName: "Logo",
      url: SITE_URL,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["/og-image.png"],
    },
  };
};
