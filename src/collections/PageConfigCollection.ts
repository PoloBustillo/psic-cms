import { buildCollection } from "firecms";
import { PageConfigType } from "../types/PageConfigType";

export const paginaConfigCollection = buildCollection<PageConfigType>({
  group: "Configuraciones",
  name: "Página de Inicio",
  defaultSize: "m",
  singularName: "Pagina",
  customId: [
    { id: "banner", label: "Banner-Reseñas" },
    { id: "servicios", label: "Tarjetas Servicios" },
    { id: "fqa", label: "Preguntas Frecuentes" },
    { id: "contact", label: "Contanto" },
    { id: "carrousel", label: "Carrousel de Información" },
  ],
  path: "page-configs",
  icon: "Web",
  inlineEditing: true,
  properties: {
    priority: {
      dataType: "number",
      name: "Prioridad",
      validation: { required: true, requiredMessage: "Es requerida" },
    },
    enabled: {
      dataType: "boolean",
      name: "Habilitado",
      defaultValue: true,
      validation: { required: true, requiredMessage: "Es requerida" },
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
