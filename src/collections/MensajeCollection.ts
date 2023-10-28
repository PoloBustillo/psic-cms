import { MensajeType } from "../types/MensajeType";
import { buildCollection } from "firecms";

export const messageCollection = buildCollection<MensajeType>({
  group: "Configuraciones",
  name: "Mensajes",
  defaultSize: "m",
  singularName: "Mensaje",
  customId: [
    { id: "mensaje", label: "Mensaje Inicial" },
    { id: "lema", label: "Lema Inicial" },
    { id: "frase", label: "Frase Inicial" },
  ],
  path: "mensaje",
  icon: "InsertComment",
  inlineEditing: true,
  properties: {
    message: {
      columnWidth: 400,
      name: "Mensaje",
      validation: { required: true },
      dataType: "string",
      markdown: true,
    },
    enable: {
      name: "Habilitado",
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
