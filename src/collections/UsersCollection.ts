import { buildCollection } from "firecms";
import { UsersType } from "../types/UsersType";

export const usersCollection = buildCollection<UsersType>({
  group: "Configuraciones",
  name: "Usuarios",
  defaultSize: "m",
  singularName: "Users",
  path: "users",
  icon: "PeopleAlt",
  inlineEditing: true,
  properties: {
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
  permissions: ({ authController }) => {
    return {
      edit: true,
      create: true,
      delete: true,
    };
  },
});
