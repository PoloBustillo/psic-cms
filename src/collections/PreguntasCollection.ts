import { buildCollection } from "firecms";
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
    pregunta: {
      dataType: "string",
      name: "Pregunta",
      validation: { required: true, requiredMessage: "Es requerida" },
    },
    respuesta: {
      dataType: "string",
      name: "Respuesta",
      markdown: true,
      validation: { required: true, requiredMessage: "Es requerida" },
    },
    orden: {
      dataType: "number",
      name: "Orden",
      defaultValue: 0,
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
