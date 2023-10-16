import { MensajeType } from "../types/MensajeType";
import { buildCollection } from "@camberi/firecms";

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
      editable: true,
      multiline: true,
      markdown: true,
    },
    enable: {
      name: "Habilitado",
      defaultValue: true,
      validation: { required: true },
      dataType: "boolean",
      editable: true,
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
