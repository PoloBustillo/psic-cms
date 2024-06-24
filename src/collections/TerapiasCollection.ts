import { buildCollection } from "firecms";
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
    },
    duration: {
      dataType: "number",
      validation: { required: true },
      name: "Duración (min.)",
      defaultValue: 50,
    },
    type: {
      name: "Tipo de terapia",
      dataType: "string",
      enumValues: {
        Educativa: "Educativa",
        Social: "Social",
        Clinica: "Clinica",
        Organizacional: "Organizacional",
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
