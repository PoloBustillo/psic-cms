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
    user: {
      dataType: "reference",
      name: "Usuario",
      path: "users",
    },
    tarea: {
      dataType: "reference",
      name: "Tarea",
      path: "tareas",
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
  },
  permissions: ({ authController }) => {
    return {
      edit: true,
      create: true,
      delete: true,
    };
  },
});
