import { buildCollection } from "firecms";
import { InformacionPersonalType } from "../types/InformacionPersonalType";

enum InfoPersonal {
  daniela = "daniela-diaz",
}
export const informacionPersonal = buildCollection<InformacionPersonalType>({
  group: "Datos de la página",
  name: "Información personal",
  customId: InfoPersonal,
  defaultSize: "m",
  singularName: "Información personal",
  path: "info",
  icon: "PermContactCalendar",
  inlineEditing: true,
  properties: {
    image: {
      name: "Imagen personal",
      dataType: "string",
      storage: {
        storagePath: "imagenesTerapia",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
    shortDescription: {
      dataType: "string",
      columnWidth: 400,
      name: "Descripción personal",
      markdown: true,
      validation: { required: true, requiredMessage: "Es requerida" },
    },
    events: {
      dataType: "array",
      name: "Eventos",
      of: {
        dataType: "map",
        name: "Evento",
        properties: {
          values: {
            name: "Nombre",
            validation: { required: true },
            dataType: "string",
          },
          type: {
            name: "Descripción",
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
