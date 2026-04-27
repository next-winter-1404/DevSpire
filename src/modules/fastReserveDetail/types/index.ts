export interface IAbout {
  title: string;
  caption: string;
}

export interface IFacility {
  id: string;
  name: string;
  icon: string;
}

export interface IReview {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  likes: number;
  content: string;
  images?: string[];
}

export interface IFacilitiesTabProps {
  aboutContent: IAbout;
  facilities: IFacility[];
  reviews: IReview[];
}
