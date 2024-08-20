import { buildCollection } from "firecms";
import { CarouselType } from "../types/CarouselType";

export const carouselCollection = buildCollection<CarouselType>({
  group: "Configuraciones",
  name: "Carousel de información",
  defaultSize: "l",
  singularName: "Carousel",
  path: "carousel",
  icon: "ViewCarousel",
  inlineEditing: true,
  properties: {
    image: {
      name: "Imagen",
      columnWidth: 250,
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
      columnWidth: 600,
      markdown: true,
      validation: { required: true },
    },
    title: {
      dataType: "string",
      name: "Titulo",
      validation: { required: true },
    },
    url: {
      dataType: "string",
      name: "Link",
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
