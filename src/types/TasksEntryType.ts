import { TerapiasType } from "./TerapiasType";

type TableTask = {
  type: "table";
  value: Map<any, any>;
  columns: string[];
  rows: string[];
  canExpand: boolean;
};

type TextTask = {
  type: "text";
  value: string;
  content: string;
  header: string;
};

type FileTask = {
  type: "text";
  content: string[];
  document: string;
};

export type TasksEntryType = {
  fechaEntrega: Date;
  fechaInicio: Date;
  name: string;
  users: [];
  explicacion: string;
  status: string;
  type: (TableTask | TextTask | FileTask)[];
};
