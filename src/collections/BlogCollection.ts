import { buildCollection, buildProperty } from "firecms";
import { BlogEntryPreview } from "../previews/BlogEntryPreview";
import { BlogEntryType } from "../types/BlogEntryType";

export const blogCollection = buildCollection<BlogEntryType>({
  name: "Entrada de Blog",
  group: "Blog",
  icon: "Article",
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
      name: "Nombre de entrada",
      validation: { required: true },
      dataType: "string",
    }),
    header_image: buildProperty({
      name: "Imagen principal",
      dataType: "string",
      validation: { required: true },
      storage: {
        mediaType: "image",
        storagePath: "images",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    }),
    content: buildProperty({
      name: "Content",
      validation: { required: true },
      dataType: "array",
      columnWidth: 400,
      oneOf: {
        typeField: "type",
        valueField: "value",
        properties: {
          images: buildProperty({
            name: "Imagenes del articulo",
            dataType: "array",
            of: buildProperty({
              dataType: "string",
              storage: {
                mediaType: "image",
                storagePath: "images",
                acceptedFiles: ["image/*"],
                metadata: {
                  cacheControl: "max-age=1000000",
                },
              },
            }),
          }),
          text: buildProperty({
            dataType: "string",
            name: "Texto del articulo",
            markdown: true,
          }),
          products: buildProperty({
            name: "Terapias",
            dataType: "array",
            of: {
              dataType: "reference",
              path: "terapias", // you need to define a valid collection in this path
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
