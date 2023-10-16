import { buildCollection } from "@camberi/firecms";
import { PreguntasType } from "../types/PreguntasType";

export const preguntasCollection = buildCollection<PreguntasType>({
  group: "Datos de la página",
  name: "Preguntas",
  defaultSize: "m",
  singularName: "Preguntas",
  path: "preguntas",
  icon: "Quiz",
  inlineEditing: true,
  properties: {
    pregunta: { dataType: "string", name: "Pregunta" },
    respuesta: {
      dataType: "string",
      name: "Respuesta",
      markdown: true,
      multiline: true,
      columnWidth: 400,
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
