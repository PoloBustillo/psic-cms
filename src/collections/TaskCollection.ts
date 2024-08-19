import { buildCollection, buildProperty } from "firecms";

import { TasksEntryType } from "../types/TasksEntryType";

export const tasksCollection = buildCollection<TasksEntryType>({
  name: "Tarea",
  group: "Tareas",
  icon: "Article",
  path: "tareas",
  properties: {
    name: buildProperty({
      name: "Nombre de tarea",
      validation: { required: true },
      dataType: "string",
    }),
    users: {
      dataType: "array",
      name: "Usuarios",
      of: {
        dataType: "reference",
        path: "users",
      },
    },
    explicacion: {
      dataType: "string",
      name: "Explicación",
      markdown: true,
    },
    fechaInicio: buildProperty({
      name: "Fecha de inicio",
      dataType: "date",
      validation: { required: true },
    }),
    fechaEntrega: buildProperty({
      name: "Fecha de entrega",
      dataType: "date",
      readOnly: true,
    }),
    status: buildProperty(({ values }) => ({
      name: "Status",
      dataType: "string",
      columnWidth: 140,
      enumValues: {
        completado: "Completado",
        enProgreso: "En progreso",
        inicio: "Inicio",
      },
      defaultValue: "inicio",
    })),
    type: buildProperty({
      name: "Tipo de tarea",
      dataType: "array",
      columnWidth: 400,
      oneOf: {
        typeField: "type",
        valueField: "value",
        properties: {
          table: buildProperty({
            name: "Tabla",
            dataType: "map",
            properties: {
              columns: {
                dataType: "array",
                name: "Columnas",
                of: {
                  dataType: "string",
                },
              },
              rows: {
                dataType: "array",
                name: "Filas",
                of: {
                  dataType: "string",
                },
              },
              canExpand: {
                dataType: "boolean",
                name: "Expandible",
              },
            },
          }),
          text: buildProperty({
            name: "Texto",
            dataType: "string",
            markdown: true,
          }),
          file: buildProperty({
            name: "Archivo",
            dataType: "map",
            properties: {
              content: {
                dataType: "array",
                name: "Documentos",
                of: {
                  dataType: "string",
                  storage: {
                    storagePath: "tareas",
                    metadata: {
                      cacheControl: "max-age=1000000",
                    },
                  },
                },
              },
              document: {
                dataType: "string",
                name: "Contenido",
              },
            },
          }),
        },
      },
    }),
  },
});
