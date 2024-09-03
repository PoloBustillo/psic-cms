import { EntityReference } from "firecms";

export type TareasPreguntas = {
  pregunta: string;
  type:
    | {
        value: "open";
      }
    | {
        value: "range";
        startRange: number;
        endRange: number;
      }
    | {
        value: "options";
        options: [];
      }
    | {
        value: "multiple";
        multiple: [];
      }
    | {
        value: "archivo";
        tipo: {
          value: "imagen";
        };
      }
    | {
        value: "email";
      }
    | {
        value: "password";
      }
    | {
        value: "numeric";
      }
    | {
        value: "phone";
      }
    | {
        value: "date";
      }
    | {
        value: "code";
      };
  required: boolean;
  enable: boolean;
  multiLine: boolean;
  maxCharacters: Number;
  prioridad: Number;
  description: string;
};
