import { buildCollection, buildProperty } from "firecms";
import { BlogEntryPreview } from "../previews/BlogEntryPreview";
import { BlogEntryType } from "../types/BlogEntryType";

export const blogCollection = buildCollection<BlogEntryType>({
  name: "Entrada de Blog",
  group: "Blog",
  icon: "Feed",
  path: "blog",
  views: [
    {
      path: "preview",
      name: "Vista previa",
      Builder: BlogEntryPreview,
    },
  ],
  properties: {
    name: buildProperty({
      name: "Nombre de articulo",
      validation: { required: true },
      dataType: "string",
    }),

    autor: {
      dataType: "string",
      validation: { required: true },
      name: "Autor del articulo",
      defaultValue: "Psic. Daniela Diaz",
    },
    header_image: buildProperty({
      name: "Imagen principal",
      dataType: "string",
      validation: { required: true },
      storage: {
        mediaType: "image",
        storagePath: "blogImages",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    }),
    resumen: {
      dataType: "string",
      name: "Resumen",
      markdown: true,
    },
    card_image: buildProperty({
      name: "Imagen de tarjeta",
      dataType: "string",
      validation: { required: true },
      storage: {
        mediaType: "image",
        storagePath: "blogImages",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    }),
    views: { dataType: "number", name: "vistas", defaultValue: 0 },
    tags: {
      dataType: "array",
      name: "Tags",
      of: {
        dataType: "string",
        name: "Tag",
      },
    },
    content: buildProperty({
      name: "Content",
      validation: { required: true },
      dataType: "array",
      columnWidth: 400,
      oneOf: {
        typeField: "type",
        valueField: "value",
        properties: {
          image: buildProperty({
            name: "Imagenes del articulo",

            dataType: "map",
            properties: {
              image: {
                dataType: "string",
                name: "Imagen",
                storage: {
                  storagePath: "images",
                  acceptedFiles: ["image/*"],
                  metadata: {
                    cacheControl: "max-age=1000000",
                  },
                },
              },
              caption: { dataType: "string", name: "Descripción" },
            },
          }),
          text: buildProperty({
            dataType: "string",
            name: "Texto del articulo",
            markdown: true,
          }),
          terapias: buildProperty({
            name: "Terapias",
            dataType: "array",
            of: {
              dataType: "reference",
              path: "terapias", // you need to define a valid collection in this path
            },
          }),
          quote: buildProperty({
            name: "Quote",
            dataType: "map",
            properties: {
              text: { dataType: "string", name: "Texto" },
              autor: { dataType: "string", name: "Autor" },
            },
          }),
        },
      },
    }),
    status: buildProperty(({ values }) => ({
      name: "Status",
      validation: { required: true },
      dataType: "string",
      columnWidth: 140,
      enumValues: {
        published: {
          id: "published",
          label: "Publicado",
          disabled: !values.header_image,
        },
        draft: "Borrador",
      },
      defaultValue: "draft",
    })),
    created_on: buildProperty({
      name: "Creado en",
      dataType: "date",
      autoValue: "on_create",
    }),
  },
});
