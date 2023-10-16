import { buildCollection } from "@camberi/firecms";
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
    images: {
      columnWidth: 600,
      name: "Imagenes",
      validation: { required: true },
      dataType: "array",
      editable: true,
      of: {
        dataType: "string",
        storage: {
          storagePath: "imagenesBanner",
          acceptedFiles: ["image/*"],
          metadata: {
            cacheControl: "max-age=1000000",
          },
        },
      },
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
