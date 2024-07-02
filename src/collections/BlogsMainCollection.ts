import { buildCollection, buildProperty } from "firecms";

import { BlogsMainType } from "../types/BlogsType";
enum BlogsEnum {
  blog = "main-blog",
}
export const blogsCollection = buildCollection<BlogsMainType>({
  name: "Página Principal de Blogs",
  group: "Blog",
  icon: "DisplaySettings",
  customId: BlogsEnum,
  path: "blogs",
  properties: {
    video: {
      name: "Video",

      dataType: "map",
      properties: {
        url: { dataType: "string", name: "Url" },
        msg: { dataType: "string", name: "Texto" },
      },
    },
  },
});
