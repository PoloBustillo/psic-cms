import { buildCollection } from "@camberi/firecms";
import { SitiosType } from "../types/SitiosType";

export const sitiosCollection = buildCollection<SitiosType>({
  group: "Datos de la página",
  name: "Sitios",
  defaultSize: "m",
  singularName: "Sitios",
  customId: true,
  path: "data",
  icon: "Newspaper",
  inlineEditing: true,
  properties: {
    name: {
      name: "Nombre",
      dataType: "string",
      validation: { required: true },
      editable: true,
    },
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
    telefono: {
      dataType: "string",
      name: "Telefono",
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
      dataType: "array",
      validation: { required: true, uniqueInArray: true },
      of: {
        dataType: "map",
        properties: {
          type: {
            dataType: "string",
            validation: { required: true, uniqueInArray: true },
            enumValues: {
              calle: "Calle",
              zona: "Zona",
              colonia: "Colonia",
              cp: "CP",
              entidad: "Ciudad/Estado",
            },
            name: "Tipo",
          },
          values: {
            name: "Valor",
            editable: true,
            validation: { required: true },
            dataType: "string",
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
