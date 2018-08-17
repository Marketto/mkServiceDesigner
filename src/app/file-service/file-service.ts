import { Injectable } from "@angular/core";
import { JsonMockFileService } from "./json-file-service/json-mock-file.service";
import { JsonSchemaFileService } from "./json-file-service/json-schema-file.service";
import { MksdFileService } from "./mksd-file-service/mksd-file.service";
import { MockettaroFileService } from "./mockettaro-file-service/mockettaro-file.service";
import { WsdlFileService } from "./wsdl-file-service/wsdl-file.service";

@Injectable()
export class FileService {

  constructor(
    public mksdFileService: MksdFileService,
    public wsdlFileService: WsdlFileService,
    public jsonSchemaFileService: JsonSchemaFileService,
    public jsonMockFileService: JsonMockFileService,
    public mockettaroFileService: MockettaroFileService,
  ) {}

}
