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
    explicacion: {
      dataType: "string",
      name: "Instrucciones de tarea",
      markdown: true,
    },
    type: buildProperty({
      name: "Secciones",
      dataType: "array",
      of: {
        dataType: "map",
        properties: {
          type: {
            dataType: "array",
            oneOf: {
              typeField: "type",
              valueField: "value",
              properties: {
                name: {
                  name: "Archivo",
                  dataType: "string",
                },
                text: {
                  dataType: "string",
                  name: "Texto",
                },
                link: {
                  dataType: "string",
                  name: "Tipo de Link",
                },
                formulario: {
                  dataType: "reference",
                  name: "Formulario",
                  path: "tipos-encuestas",
                },
              },
            },
            // of: {
            //   dataType: "string",
            //   name: "Tipo de sección",
            //   validation: { required: true },
            //   enumValues: {
            //     texto: "Texto",
            //     archivo: "Archivo",
            //     link: "Link",
            //     formulario: "Formulario",
            //     tabla: {
            //       id: "table",
            //       label: "Tabla",
            //       disabled: true,
            //     },
            //   },
            // },
          },
          description: {
            dataType: "string",
            name: "Descipción",
            validation: { required: true },
            markdown: true,
          },
          name: {
            dataType: "string",
            name: "Nombre de sección",
            validation: { required: true },
          },
        },
      },
    }),
  },
});
