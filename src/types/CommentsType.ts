import { EntityReference } from "firecms";
import { UsersType } from "./UsersType";

export type CommentsType = {
  blogId: any;
  userId: any;
  commentText: string;
  replies: CommentsType[];
  created_on: Date;
  status: string;
  isReply: boolean;
  likes: [string];
};
