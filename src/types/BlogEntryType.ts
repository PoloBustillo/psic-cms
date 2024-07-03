import { TerapiasType } from "./TerapiasType";

type BlogEntryImages = {
  type: "images";
  value: string[];
};

type BlogEntryText = {
  type: "text";
  value: string;
};

type BlogEntryTerapia = {
  type: "terapias";
  value: TerapiasType[]; // The Product type is coming from the quickstart
};
type BlogEntryQuote = {
  type: "quote";
  value: string;
};

export type BlogEntryType = {
  name: string;
  autor: string;
  resumen: string;
  header_image: string;
  card_image: string;
  created_on: Date;
  views: number;
  tags: [];
  status: string;
  content: (
    | BlogEntryImages
    | BlogEntryText
    | BlogEntryTerapia
    | BlogEntryQuote
  )[];
};
