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

export interface ICommentUser {
  firstName: string;
  lastName: string;
  profilePicture: string | null;
}

export interface IParentComment {
  id: number;
  house_id: number;
  title: string;
  caption: string;
  rating: string;
  created_at: string;
  parent_comment_id: number | null;
  user: ICommentUser;
}

export interface ICommentItem {
  id: number;
  house_id: number;
  title: string;
  caption: string;
  rating: string;
  created_at: string;
  parent_comment_id: number | null;
  user: ICommentUser;
  parent_comment: IParentComment | null;
}

export interface ICommentsResponse {
  comments: ICommentItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface ICommentTreeItem extends ICommentItem {
  children: ICommentTreeItem[];
}

export type TAddFavoriteHouse = {
  house_id: number;
  user_id: number | string | null;
};

export interface IDecodedToken {
  email: string;
  exp: number;
  iat: number;
  id: number;
  name: string;
  profilePicture: string | null;
  role: "buyer" | "seller" | "admin";
}
