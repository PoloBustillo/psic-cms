import { buildCollection, buildProperties, buildProperty } from "firecms";
import { TareaUsuarioRespuestaType } from "../types/TareaUsuarioRespuestaType";
import RangeDateField from "../customfield/RandeDateField";
import RangeDatePreview from "../previews/RangeDatePreview";

export const tareasUsuarioRespuestasCollection = buildCollection<
  Partial<TareaUsuarioRespuestaType>
>({
  path: "tareas-usuario-respuestas",
  defaultSize: "l",
  group: "Tareas",
  icon: "Quiz",
  properties: {
    user: buildProperty({
      dataType: "reference",
      name: "Usuario",
      path: "users",
    }),
    tarea: buildProperty({
      dataType: "reference",
      name: "Tarea",
      columnWidth: 700,
      path: "tareas",
    }),
    respuesta: buildProperty({
      dataType: "reference",
      name: "Respuesta",
      path: "respuestas",
    }),
    rangeDate: buildProperty({
      name: "Rango de fechas",
      dataType: "array",
      of: {
        name: "Fechas",
        dataType: "date",
        mode: "date",
        defaultValue: new Date(),
      },
      Field: RangeDateField,
      Preview: RangeDatePreview,
      validation: { required: true },
      description: "Rango de fechas para formulario",
      columnWidth: 300,
    }),
    status: {
      dataType: "string",
      name: "Estado",
      validation: {
        required: true,
      },
      enumValues: {
        abierta: "Abierta",
        revisada: "Revisada",
        entregada: "Entregada",
      },
      defaultValue: "abierta",
    },
  },
  name: "Tareas-Usuario-Respuestas",
  inlineEditing: false,
});
