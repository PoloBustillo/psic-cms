import { buildCollection } from "@camberi/firecms";
import { TerapiasType } from "../types/TerapiasType";

export const terapiasCollection = buildCollection<TerapiasType>({
  group: "Terapias",
  name: "Terapias",
  defaultSize: "m",
  singularName: "Terapia",
  path: "terapias",
  icon: "Diversity1",
  inlineEditing: true,
  properties: {
    name: {
      name: "Nombre",
      validation: { required: true },
      dataType: "string",
      editable: true,
    },
    type: {
      name: "Tipo de terapia",
      dataType: "array",
      validation: { uniqueInArray: true, max: 1 },
      of: {
        dataType: "string",
        name: "Tipos",
        enumValues: {
          educativa: "Educativa",
          social: "Social",
          clinica: "Clinica",
          organizacional: "Organizacional",
        },
      },
    },
    costos: {
      name: "Costos",
      dataType: "array",
      validation: { uniqueInArray: true },
      of: {
        dataType: "map",
        name: "Costos",
        properties: {
          values: {
            name: "Precio",
            editable: true,
            validation: { required: true },
            dataType: "number",
          },
          type: {
            name: "Tipo servicio",
            validation: { required: true, uniqueInArray: true },
            dataType: "string",
            enumValues: {
              presencial: "Presencial",
              online: "En linea",
            },
          },
        },
      },
    },
    description: {
      name: "Descipción Corta",
      dataType: "string",
      markdown: true,
      multiline: true,
    },
    longDescription: {
      name: "Descipción Larga",
      dataType: "string",
      markdown: true,
      multiline: true,
    },
    imageBanner: {
      name: "Imagen Principal",
      dataType: "string",
      storage: {
        storagePath: "imagenesTerapia",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
    imageDescription: {
      name: "Imagen Tarjeta",
      dataType: "string",
      storage: {
        storagePath: "imagenesTerapia",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
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
