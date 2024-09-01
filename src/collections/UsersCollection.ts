import { buildCollection, buildProperty } from "firecms";
import { UsersType } from "../types/UsersType";
import RangeDatePreview from "../previews/RangeDatePreview";
import RangeDateField from "../customfield/RandeDateField";

export const usersCollection = buildCollection<UsersType>({
  group: "Configuraciones",
  name: "Usuarios",
  defaultSize: "m",
  singularName: "Users",
  path: "users",
  icon: "PeopleAlt",
  inlineEditing: true,
  properties: {
    tareas: {
      dataType: "array",
      name: "Tareas",
      of: {
        dataType: "map",
        name: "Tarea",
        properties: {
          tarea: {
            dataType: "reference",
            name: "Enlace a tarea",
            path: "tareas",
          },
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
              cerrada: "Cerrada",
              completada: "Completada",
            },
            defaultValue: "abierta",
          },
        },
      },
    },
    terapia: {
      dataType: "array",
      name: "Terapias",
      of: {
        dataType: "reference",
        path: "terapias",
      },
    },
    image: {
      dataType: "string",
      storage: {
        storagePath: "avatars",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },

    name: {
      dataType: "string",
      name: "Nombre",
    },
    apellidoPaterno: {
      dataType: "string",
      name: "Apellido Paterno",
    },
    subscripcion: {
      dataType: "boolean",
      name: "Subscripción a blog",
    },
    apellidoMaterno: {
      dataType: "string",
      name: "Apellido Materno",
    },
    email: {
      dataType: "string",
      name: "Email",
      readOnly: true,
      columnWidth: 300,
    },
    celular: { dataType: "string", name: "Celular" },

    fechaNacimiento: {
      dataType: "string",
      name: "Fecha de Nacimiento",
    },
    escolaridad: { dataType: "string", name: "Escolaridad" },
    religion: { dataType: "string", name: "Religión" },
    ocupacion: { dataType: "string", name: "Ocupación" },
    sexo: { dataType: "string", name: "Sexo" },
    notas: { dataType: "string", name: "Notas", markdown: true },
  },
  permissions: ({}) => {
    return {
      edit: true,
      create: true,
      delete: true,
    };
  },
});
