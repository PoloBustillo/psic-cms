import { EnumType, EnumValues, MapProperty } from "firecms";

export type SitiosType = {
  name: string;
  slogan: string;
  email: string;
  telefono: string;
  address: any;
  googleMapUrl: string;
  website: string;
  tags: [string];
  extraData: [MapProperty];
  socialNetwork: [];
};
