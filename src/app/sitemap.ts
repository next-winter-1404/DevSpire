import { THousesResponse } from "@/components/common/types";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locales = ["fa", "en"];
  const statics = [
    "",
    "/comparison",
    "/blogs",
    "/comparison",
    "/contact-us",
    "/property-valuation",
    "/fast-reserve",
    "/mortgage-rent",
  ];
  const routes: MetadataRoute.Sitemap = locales.flatMap((locale) => {
    return statics.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  });

  // const reserveHouses = (await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/houses?transactionType=reservation`,
  //   {
  //     next: {
  //       revalidate: 3600,
  //     },
  //   },
  // ).then((res) => res.json())) as THousesResponse;
  // if (reserveHouses && reserveHouses.houses.length > 0) {
  //   reserveHouses.houses.forEach((item) => {
  //     routes.push({
  //       url: `${SITE_URL}/fa/fast-reserve/${item.id}`,
  //       lastModified: new Date(),
  //       changeFrequency: "weekly" as const,
  //       priority: 0.6,
  //     });
  //   });
  // }

  // const mortgageHouses = (await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/houses?transactionType=mortgage`,
  //   {
  //     next: {
  //       revalidate: 3600,
  //     },
  //   },
  // ).then((res) => res.json())) as THousesResponse;
  // if (mortgageHouses && mortgageHouses.houses.length > 0) {
  //   mortgageHouses.houses.forEach((item) => {
  //     routes.push({
  //       url: `${SITE_URL}/fa/mortgage-rent/${item.id}`,
  //       lastModified: new Date(),
  //       changeFrequency: "weekly" as const,
  //       priority: 0.6,
  //     });
  //   });
  // }

  return routes;
}
