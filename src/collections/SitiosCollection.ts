import { buildCollection } from "@camberi/firecms";
import { SitiosType } from "../types/SitiosType";

export const sitiosCollection = buildCollection<SitiosType>({
  group: "Configuraciones",
  name: "Sitios",
  defaultSize: "m",
  singularName: "Sitios",
  customId: true,
  path: "data",
  icon: "Newspaper",
  inlineEditing: true,
  properties: {
    website: {
      url: true,
      name: "Webpage",
      dataType: "string",
      validation: { required: false },
      editable: true,
    },
    socialNetwork: {
      name: "Redes",
      dataType: "array",
      of: {
        dataType: "map",
        name: "red social",
        properties: {
          values: {
            name: "URL",
            editable: true,
            validation: { required: true },
            dataType: "string",
          },
          red: {
            name: "Red Social",
            validation: { required: true, uniqueInArray: true },
            dataType: "string",
            enumValues: {
              facebook: "Facebook",
              twitter: "Twitter",
              linkedin: "Linkedin",
              instagram: "Instagram",
              whatsapp: "Whatsapp",
            },
          },
        },
      },
    },
    name: {
      name: "Nombre",
      dataType: "string",
      validation: { required: true },
      editable: true,
    },
    googleMapUrl: {
      url: true,
      name: "GMap URL",
      dataType: "string",
      validation: { required: false },
      editable: true,
    },

    tags: {
      name: "Etiquetas",
      dataType: "array",
      of: {
        dataType: "string",
      },
      validation: { required: false },
      editable: true,
    },
    email: {
      email: true,
      name: "Email",
      validation: { required: true },
      dataType: "string",
      editable: true,
    },
    address: {
      name: "Dirección",
      dataType: "string",
      validation: { required: true },
      editable: true,
      multiline: true,
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
