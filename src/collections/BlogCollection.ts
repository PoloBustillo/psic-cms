import {
  buildCollection,
  buildEntityCallbacks,
  buildProperty,
  EntityOnSaveProps,
} from "firecms";
import { BlogEntryPreview } from "../previews/BlogEntryPreview";
import { BlogEntryType } from "../types/BlogEntryType";
import axios from "axios";

const productCallbacks = buildEntityCallbacks({
  onSaveSuccess: async (props: EntityOnSaveProps<BlogEntryType>) => {
    // return the updated values
    // console.log("DATA", context.dataSource);
    // let data = await context.dataSource.fetchCollection({
    //   path: "users",
    //   collection: collection,
    // });

    // Check if the status is "published"
    if (props.values.status === "published") {
      // Prepare the request configuration
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://danielawebsitev2.vercel.app/api/email/newblog?name=${props.values.name}&description=${props.values.resumen}`,
      };

      // Send the request
      const response = await axios.request(config);

      // Log the response
      console.log("RESPONSE", response);
    }
  },
});
export const blogCollection = buildCollection<BlogEntryType>({
  name: "Entrada de Blog",
  group: "Blog",
  icon: "Feed",
  path: "blog",
  callbacks: productCallbacks,
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
