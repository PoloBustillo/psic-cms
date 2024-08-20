import { MensajeType } from "../types/MensajeType";
import { buildCollection } from "firecms";

export const messageCollection = buildCollection<MensajeType>({
  group: "Configuraciones",
  name: "Titulos y mensajes",
  defaultSize: "m",
  singularName: "Mensaje",
  customId: [
    { id: "mensaje", label: "Mensaje Inicial" },
    { id: "lema", label: "Lema Inicial" },
    { id: "frase", label: "Frase Inicial" },
  ],
  path: "mensaje",
  icon: "Rtt",
  inlineEditing: true,
  properties: {
    message: {
      columnWidth: 600,
      name: "Mensaje",
      validation: { required: true },
      dataType: "string",
      markdown: true,
    },
    enable: {
      name: "Habilitado",
      columnWidth: 200,
      defaultValue: true,
      validation: { required: true },
      dataType: "boolean",
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
