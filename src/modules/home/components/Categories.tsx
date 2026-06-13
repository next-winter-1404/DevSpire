import { TCategoriesResponse } from "@/components/common/types";
import CategoriesTop from "./CategoriesTop";
import CategoryBigCard from "./CategoryBigCard";
import CategorySmallCard from "./CategorySmallCard";
import { apiFetch } from "@/core/Server-fetch/fetchApi";


const Categories = async () => {


  const data = await apiFetch<TCategoriesResponse>("/categories", {
    params: {
      limit: "12",
      order: "DESC",
      sort: "price",
    },
    cache: "no-store",
  });

  const categories = data?.data?.slice(0,8) || [];


  const categorySmallCards1 = [
    {id:1, name: categories[0].name, imageUrl:"/images/home/villa-estate.png"},
    {id:3, name: categories[1].name, imageUrl:"/images/home/cottage-estate.jpg"},
  ]
  const categorySmallCards2 = [
    {id:2, name: categories[5].name, imageUrl:"/images/home/with-swimmingpool.jpg"},
    {id:4, name: categories[3].name, imageUrl:"/images/home/coastal-estate.png"},
  ]

  return (
    <div className="flex justify-center w-full mt-30 px-4   md:px-6   lg:px-10">
      <div className="flex flex-col items-start gap-10 w-full   md:w-auto">
        <CategoriesTop/>
        <div className="flex flex-col justify-center gap-10 w-full   md:flex-row">
          <div className="w-full   md:w-1/4">
            <CategoryBigCard title={categories[6].name} imageUrl="/images/home/apartment.jpg"/>
          </div>
          <div className="flex flex-col w-full gap-10   md:flex-row">
            <div className="flex flex-col flex-wrap justify-center w-full gap-10">
              {
                categorySmallCards1.map((item) => (
                  <CategorySmallCard name={item.name} imageUrl={item.imageUrl} key={item.id}/>
                ))
              }
            </div>
            <div className="flex flex-col flex-wrap justify-center w-full gap-10">
              {
                categorySmallCards2.map((item) => (
                  <CategorySmallCard name={item.name} imageUrl={item.imageUrl} key={item.id}/>
                ))
              }
            </div>
          </div>
          <div className="w-full   md:w-1/4">
            <CategoryBigCard title={categories[2].name} imageUrl="/images/home/ecotourism.png"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
