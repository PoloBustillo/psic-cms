import { buildCollection } from "firecms";

import { RespuestasType } from "../types/RespuestasType";

export const respuestasCollection = buildCollection<RespuestasType>({
  group: "Tareas",
  name: "Respuestas Tareas",
  defaultSize: "m",
  singularName: "Respuestas",
  path: "respuestas",
  icon: "Quiz",
  inlineEditing: true,
  properties: {
    archivos: {
      dataType: "array",
      name: "Respuestas Archivos",
      of: {
        dataType: "map",
        name: "Data",
        properties: {
          nombre: {
            dataType: "string",
            name: "Nombre",
          },
          archivos: {
            dataType: "array",
            name: "Archivos",
            of: {
              dataType: "string",
              name: "Archivo",
              storage: {
                storagePath: "tareas",
                acceptedFiles: ["*/*"],
                metadata: {
                  cacheControl: "max-age=1000000",
                },
              },
            },
          },
        },
      },
    },
    data: {
      dataType: "array",
      name: "Respuestas",
      of: {
        dataType: "map",
        name: "Data",
        properties: {
          nombre: {
            dataType: "string",
            name: "Nombre",
          },
          respuesta: {
            dataType: "string",
            name: "Respuesta",
          },
        },
      },
    },
    formularios: {
      dataType: "reference",
      name: "Formulario",
      path: "formulario-respuestas",
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
