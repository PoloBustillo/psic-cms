import { buildCollection } from "firecms";
import { CarouselType } from "../types/CarouselType";

export const carouselCollection = buildCollection<CarouselType>({
  group: "Configuraciones",
  name: "Carousel",
  defaultSize: "m",
  singularName: "Carousel",
  path: "corousel",
  icon: "PermMedia",
  inlineEditing: true,
  properties: {
    image: {
      name: "Imagen",
      validation: { required: true },
      dataType: "string",
      storage: {
        storagePath: "imagenesCarousel",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
    content: {
      dataType: "string",
      name: "Contenido",
      markdown: true,
      validation: { required: true },
    },
    title: {
      dataType: "string",
      name: "Titulo",
      validation: { required: true },
    },
    enable: {
      dataType: "boolean",
      name: "Habilitado",
      defaultValue: true,
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
