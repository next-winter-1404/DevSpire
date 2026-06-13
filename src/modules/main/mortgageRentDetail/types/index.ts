export type TUser = {
  id: number;
  role: "buyer" | "seller" | "admin" | string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailVerified: boolean;
  membershipDate: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
};

export type TUserResponse = {
  user: TUser;
};
