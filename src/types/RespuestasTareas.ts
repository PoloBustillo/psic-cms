type RespuestaText = {
  value: string;
};

type RespuestaArchivo = {
  value: any;
};

export type RespuestasTareasType = {
  user: string;
  tarea: string;
  status: string;
  sections: (RespuestaText | RespuestaArchivo)[];
};

// status: buildProperty(({ values }) => ({
//   name: "Status",
//   dataType: "string",
//   columnWidth: 140,
//   enumValues: {
//     completado: "Completado",
//     enProgreso: "En revisión",
//     inicio: "Inicio",
//   },
//   defaultValue: "inicio",
// })),
