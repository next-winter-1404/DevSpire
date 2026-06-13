export type TSocialPlatform =
  | "instagram"
  | "telegram"
  | "whatsapp"
  | "linkedin"
  | "website";

export type TSocialLink = {
  id: number;
  platform: TSocialPlatform | string;
  url: string;
};

export type TSocialMediaRes = {
  data: TSocialLink[];
  totalCount: number;
};

export type TCreateSocialLink = {
  platform: TSocialPlatform | string;
  url: string;
};
