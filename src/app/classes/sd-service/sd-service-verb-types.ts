import { JsonSchema } from "typescript-json-schema-faker";

export type SdServiceVerbType =
  "GET" |
  "POST" |
  "PUT" |
  "DELETE" |
  "PATCH";

export type SdServiceIOType = "request" | "response";

export interface IsdServiceJSONSchemaType {
  io: SdServiceIOType;
  verb: SdServiceVerbType;
  uri: string;
  schema: JsonSchema;
}
