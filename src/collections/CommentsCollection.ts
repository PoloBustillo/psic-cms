import { buildCollection, buildProperty } from "firecms";
import { CommentsType } from "../types/CommentsType";

export const commentsCollection = buildCollection<CommentsType>({
  group: "Datos de la página",
  name: "Comentarios",
  defaultSize: "m",
  singularName: "comment",
  path: "comments",
  icon: "Comment",
  inlineEditing: true,
  properties: {
    blogId: { dataType: "reference", path: "blog", name: "Blog" },
    userId: { dataType: "reference", path: "users", name: "Usuario" },
    commentText: { dataType: "string", name: "Comentario" },
    replies: {
      dataType: "array",
      name: "Respuestas",
      of: { dataType: "reference", path: "comments" },
    },
    status: {
      dataType: "string",
      name: "Status",
      enumValues: { active: "Activo", inactive: "Inactivo" },
    },
    likes: {
      dataType: "array",
      name: "Likes",
      of: { dataType: "string", name: "UserId", readOnly: true },
      readOnly: true,
    },
    created_on: buildProperty({
      name: "Creado en",
      dataType: "date",
      autoValue: "on_create",
    }),
    isReply: { dataType: "boolean", name: "Es respuesta", readOnly: true },
  },
});
