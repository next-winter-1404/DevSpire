import { TCategoriesResponse } from "@/components/common/types";
import CategoriesTop from "./CategoriesTop";
import CategoryBigCard from "./CategoryBigCard";
import CategorySmallCard from "./CategorySmallCard";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import Container from "@/components/common/Container";

const Categories = async () => {
  const data = await apiFetch<TCategoriesResponse>("/categories", {
    params: {
      limit: "12",
      order: "DESC",
      sort: "price",
    },
    cache: "no-store",
  });

  const categories = data?.data?.slice(0, 8) || [];

  // جلوگیری از کرش کردن در صورت خالی بودن دیتا
  if (categories.length < 7) return null;

  const categorySmallCards1 = [
    {
      id: 1,
      name: categories[0]?.name,
      imageUrl: "/images/home/villa-estate.png",
    },
    {
      id: 2,
      name: categories[5]?.name,
      imageUrl: "/images/home/with-swimmingpool.jpg",
    },
  ];

  const categorySmallCards2 = [
    {
      id: 3,
      name: categories[1]?.name,
      imageUrl: "/images/home/cottage-estate.jpg",
    },
    {
      id: 4,
      name: categories[3]?.name,
      imageUrl: "/images/home/coastal-estate.png",
    },
  ];

  return (
    <Container>
      <div className="w-full flex justify-center mt-12 ">
        <div className="flex flex-col items-center lg:items-start gap-8 w-full ">
          <div className="w-full">
            <CategoriesTop />
          </div>

          {/* کانتینر اصلی کارت‌ها: در موبایل ستونی، در دسکتاپ ردیفی */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full">
            {/* کارت بزرگ سمت راست/بالا */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <CategoryBigCard
                title={categories[6]?.name}
                imageUrl="/images/home/apartment.jpg"
              />
            </div>

            {/* ستون میانی (کارت‌های کوچک) */}
            <div className="flex flex-col gap-6 lg:gap-10 w-full px-6 ">
              {/* ردیف اول کارت‌های کوچک */}
              <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 w-full">
                {categorySmallCards1.map((item) => (
                  <div
                    key={item.id}
                    className="w-full sm:w-1/2 flex justify-center"
                  >
                    <CategorySmallCard
                      name={item.name}
                      imageUrl={item.imageUrl}
                    />
                  </div>
                ))}
              </div>
              {/* ردیف دوم کارت‌های کوچک */}
              <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 w-full">
                {categorySmallCards2.map((item) => (
                  <div
                    key={item.id}
                    className="w-full sm:w-1/2 flex justify-center"
                  >
                    <CategorySmallCard
                      name={item.name}
                      imageUrl={item.imageUrl}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* کارت بزرگ سمت چپ/پایین */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <CategoryBigCard
                title={categories[2]?.name}
                imageUrl="/images/home/ecotourism.png"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Categories;
