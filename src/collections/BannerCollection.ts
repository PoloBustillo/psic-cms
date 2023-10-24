import { buildCollection } from "firecms";
import { BannerType } from "../types/BannerType";

export const bannerCollection = buildCollection<BannerType>({
  group: "Configuraciones",
  name: "Banner",
  defaultSize: "m",
  singularName: "Banner",
  path: "banner",
  icon: "PermMedia",
  inlineEditing: true,
  properties: {
    image: {
      name: "Imagen",
      validation: { required: true },
      dataType: "string",
      storage: {
        storagePath: "imagenesBanner",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
    description: {
      dataType: "string",
      name: "Description",
      validation: { required: true },
    },
    url: {
      dataType: "string",
      name: "Url",
      validation: { required: true },
    },
  },
  permissions: ({ authController }) => {
    return {
      edit: true,
      create: true,
      delete: true,
    };
  },
});
