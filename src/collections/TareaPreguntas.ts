import { buildCollection, buildProperties, buildProperty } from "firecms";
import { TareasPreguntas } from "../types/Preguntas";

export const tareasPreguntasCollection = buildCollection<
  Partial<TareasPreguntas>
>({
  path: "tareas-preguntas",
  defaultSize: "l",
  group: "Tareas",
  icon: "Quiz",
  initialSort: ["prioridad", "desc"],

  properties: {
    pregunta: buildProperty({
      dataType: "string",
      name: "Pregunta",
      description: "Texto de la pregunta",
      validation: {
        required: true,
        unique: true,
        requiredMessage: "Se necesita pregunta",
      },
      columnWidth: 200,
    }),
    type: buildProperty(({ values, propertyValue, previousValues }) => {
      console.log("values", values);
      console.log("propertyValue", propertyValue);
      console.log("previousValues", previousValues);

      const properties = buildProperties<any>({
        value: buildProperty({
          name: "Tipo de pregunta",
          dataType: "string",
          validation: { required: true },
          readOnly: propertyValue?.value != null,
          description: "Tipos de preguntas: Abierta, Rango, Opciones",
          enumValues: {
            range: "Rango",
            open: "Abierta",
            options: "Una Opción",
            multiple: "Multiple Opciones",
            archivo: "Archivo",
            email: "Email",
            password: "Password",
            numeric: "Numeric",
            phone: "Phone",
            date: "Date",
            code: "Clave",
          },
        }),
      });
      if (values.type) {
        if (values.type.value === "multiple") {
          properties["multiple"] = buildProperty({
            name: "Opciones",
            dataType: "array",
            validation: {
              min: 2,
              required: true,
              requiredMessage: "Almenos dos opciones debe tener",
            },
            of: {
              name: "Opción",
              dataType: "map",
              properties: {
                text: {
                  name: "Texto de la opción",
                  description: "Texto de la opción",
                  validation: { required: true },
                  dataType: "string",
                },
                extraText: {
                  name: "Texto de campo adicional",
                  description: "Texto de campo adicional",
                  validation: { required: false },
                  dataType: "string",
                },
              },
              validation: {
                required: true,
                uniqueInArray: true,
                requiredMessage: "Opción no debe estar vacía",
              },
            },
          });
        } else if (values.type.value === "options") {
          properties["options"] = buildProperty({
            name: "Opciones",
            dataType: "array",
            validation: {
              min: 2,
              required: true,
              requiredMessage: "Almenos dos opciones debe tener",
            },
            of: {
              name: "Opción",
              dataType: "map",
              properties: {
                text: {
                  name: "Texto de la opción",
                  description: "Texto de la opción",
                  validation: { required: true },
                  dataType: "string",
                },
                extraText: {
                  name: "Texto de campo adicional",
                  description: "Texto de campo adicional",
                  validation: { required: false },
                  dataType: "string",
                },
              },
              validation: {
                required: true,
                uniqueInArray: true,
                requiredMessage: "Opción no debe estar vacía",
              },
            },
          });
        } else if (values.type.value === "archivo") {
          properties["tipo"] = buildProperty({
            name: "Tipo archivo",
            dataType: "string",
            validation: { required: true },
            enumValues: {
              imagen: "Imagen",
              archivo: "Documento",
            },
          });
        } else if (values.type.value === "range") {
          properties["startRange"] = buildProperty({
            dataType: "number",
            name: "Rango inicial",
            validation: {
              required: true,
              min: 0,
              max: values.type.endRange ? values.type.endRange : 10,
            },
          });
          properties["endRange"] = buildProperty({
            dataType: "number",
            name: "Rango final",
            validation: { required: true },
          });
        }
      }

      return {
        dataType: "map",
        properties: properties,
      };
    }),
    tipoEncuesta: ({ values }) => {
      return {
        dataType: "array",
        name: "Tipo de encuestas",
        description: "Tipo de pregunta a la que pertenece esta pregunta",

        of: {
          dataType: "reference",
          path: "tipos-encuestas",
        },
        columnWidth: 300,
      };
    },
    description: {
      dataType: "string",
      name: "Descripción",
      description: "Descripción de la pregunta",
      hideFromCollection: true,
    },
    maxCharacters: buildProperty(({ values }) => {
      return {
        dataType: "number",
        columnWidth: 200,
        hideFromCollection: true,
        defaultValue: 250,
        name: "Max caracteres",
        validation: { positive: true, integer: true },
      };
    }),
    required: {
      dataType: "boolean",
      name: "Requerida",
      description: "La pregunta es obligatoria para ser contestada",
    },
    enable: {
      dataType: "boolean",
      name: "Habilitada",
      description: "La pregunta es mostrada en encuesta",
    },
    prioridad: buildProperty({
      dataType: "number",
      name: "Prioridad",
      description: "Prioridad",
      validation: {
        required: true,
      },
      columnWidth: 200,
    }),
  },
  name: "Tareas Preguntas",
  inlineEditing: false,
});
