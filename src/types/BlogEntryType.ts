import { TerapiasType } from "./TerapiasType";

type BlogEntryImages = {
  type: "images";
  value: string[];
};

type BlogEntryText = {
  type: "text";
  value: string;
};

type BlogEntryProducts = {
  type: "products";
  value: TerapiasType[]; // The Product type is coming from the quickstart
};

export type BlogEntryType = {
  name: string;
  header_image: string;
  created_on: Date;
  status: string;
  content: (BlogEntryImages | BlogEntryText | BlogEntryProducts)[];
};
