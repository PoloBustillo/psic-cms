import { buildCollection } from "firecms";
import { PageConfigType } from "../types/PageConfigType";

export const paginaConfigCollection = buildCollection<PageConfigType>({
  group: "Configuraciones",
  name: "Estructura página de inicio",
  defaultSize: "m",
  singularName: "Pagina",
  customId: [
    { id: "banner", label: "Banner-Reseñas" },
    { id: "servicios", label: "Tarjetas Servicios" },
    { id: "fqa", label: "Preguntas Frecuentes" },
    { id: "contact", label: "Contanto" },
    { id: "carrousel", label: "Carrousel de Información" },
    { id: "blogs", label: "Blogs mas vistos" },
  ],
  path: "page-configs",
  icon: "Dashboard",
  inlineEditing: true,
  properties: {
    priority: {
      dataType: "number",
      columnWidth: 200,
      name: "Prioridad",
      validation: { required: true, requiredMessage: "Es requerida" },
    },
    enabled: {
      columnWidth: 200,
      dataType: "boolean",
      name: "Habilitado",
      defaultValue: true,
      validation: { required: true, requiredMessage: "Es requerida" },
    },
    colors: {
      dataType: "array",
      name: "Colores",
      of: {
        dataType: "map",
        name: "Color",
        properties: {
          nombre: {
            name: "Nombre",
            validation: { required: true },
            dataType: "string",
          },
          valor: {
            name: "Valor",
            dataType: "string",
            validation: { required: true },
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
