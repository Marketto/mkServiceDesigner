import { Observable } from "rxjs";
import { FileServiceData } from "./file-service-data";
import { FileServiceError } from "./file-service-error";
import { FileServiceSD } from "./file-service-sd";

export interface IfileService {
  save: (input: FileServiceSD | FileServiceData) => Observable<FileServiceData | FileServiceError>;
  load?: (input: File) => Observable<FileServiceSD | FileServiceError>;
}
