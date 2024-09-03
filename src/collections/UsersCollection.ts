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
    email: {
      dataType: "string",
      name: "Email",
      readOnly: true,
      columnWidth: 300,
    },
    celular: { dataType: "string", name: "Celular" },
    terapia: {
      dataType: "array",
      name: "Terapias",
      of: {
        dataType: "reference",
        path: "terapias",
      },
    },

    subscripcion: {
      dataType: "boolean",
      name: "Subscripción a blog",
    },
    reviews: {
      dataType: "map",
      name: "Reviews",
      readOnly: true,
      properties: {
        comfort: {
          dataType: "number",
          name: "Comfort",
        },
        comodidades: {
          dataType: "number",
          name: "Comodidades",
        },
        espacio: {
          dataType: "number",
          name: "Espacio",
        },
        limpieza: {
          dataType: "number",
          name: "Limpieza",
        },
        locacion: {
          dataType: "number",
          name: "Locacion",
        },
        servicio: {
          dataType: "number",
          name: "Servicio",
        },
        wifi: {
          dataType: "number",
          name: "Wifi",
        },
      },
    },
    apellidoMaterno: {
      dataType: "string",
      name: "Apellido Materno",
    },

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
