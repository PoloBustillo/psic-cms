import { buildCollection, buildProperty } from "firecms";
import { FormularioTareaType } from "../types/FormularioTareaType";

export const formulariosTareasCollection = buildCollection<
  Partial<FormularioTareaType>
>({
  name: "Formularios",
  singularName: "Formulario",
  path: "tipos-encuestas",
  defaultSize: "l",
  icon: "PostAdd",
  group: "Tareas",
  properties: {
    name: buildProperty({
      dataType: "string",
      name: "Nombre",
      validation: { required: true },
      description: "Nombre del formulario que aprecerá en la aplicación movil",
    }),
    description: buildProperty({
      dataType: "string",

      name: "Descripción",
    }),
    preguntas: buildProperty({
      dataType: "array",
      name: "Preguntas",
      of: {
        dataType: "reference",
        path: "tareas-preguntas",
        name: "Pregunta",
      },
    }),
    // rangeDate: buildProperty({
    //   name: "Rango de fechas",
    //   dataType: "array",
    //   of: {
    //     name: "Fechas",
    //     dataType: "date",
    //     mode: "date",
    //     defaultValue: new Date(),
    //   },
    //   Field: RangeDate,
    //   Preview: RangeDatePreview,
    //   validation: { required: true },
    //   description: "Rango de fechas para formulario",
    //   columnWidth: 300,
    // }),
  },
  description: "Tipos de encuestas o formularios disponibles",
});
