import { IReserveCard } from "../types";

export const MOCK_DATA: IReserveCard[] = [
  {
    id: "1",
    title: "خانه ویلایی بسیار عالی",
    location: "مازندران ، تنکابن",
    price: 2500000,
    oldPrice: 5000000,
    discount: 50,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    parking: 1,
    imageUrl: "/images/fastReservePage/house1.png",
  },
  {
    id: "2",
    title: "خانه ویلایی با پارکینگ اختصاصی",
    location: "مازندران ، تنکابن",
    price: 2500000,
    oldPrice: 5000000,
    discount: 50,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    parking: 1,
    imageUrl: "/images/fastReservePage/house1.png",
  },
  {
    id: "3",
    title: "ویلا استخر دار خفن",
    location: "مازندران ، تنکابن",
    price: 2500000,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    parking: 1,
    imageUrl: "/images/fastReservePage/house1.png",
  },
  {
    id: "4",
    title: "خانه ویلایی بسیار عالی",
    location: "مازندران ، تنکابن",
    price: 2500000,
    oldPrice: 5000000,
    discount: 50,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    parking: 1,
    imageUrl: "/images/fastReservePage/house1.png",
  },
  {
    id: "5",
    title: "خانه ویلایی با پارکینگ اختصاصی",
    location: "مازندران ، تنکابن",
    price: 2500000,
    oldPrice: 5000000,
    discount: 50,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    parking: 1,
    imageUrl: "/images/fastReservePage/house1.png",
  },
  {
    id: "6",
    title: "ویلا استخر دار خفن",
    location: "مازندران ، تنکابن",
    price: 2500000,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    parking: 1,
    imageUrl: "/images/fastReservePage/house1.png",
  },
];

export const breadcrumbItemsMock = [
  { label: "خانه", href: "/" },
  { label: "رزرو هتل", href: "/hotels" },
  { label: "رزرو هتل رشت" },
];

export const locationOptions = [
  { value: "tehran", label: "تهران" },
  { value: "isfahan", label: "اصفهان" },
  { value: "shiraz", label: "شیراز" },
];

export const sortOptions = [
  { value: "desc", label: "جدید ترین ها" },
  { value: "cheapest", label: "ارزان ترین ها" },
];
