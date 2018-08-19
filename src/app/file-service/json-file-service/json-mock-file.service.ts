import { Injectable } from "@angular/core";
import * as jsf from "json-schema-faker";
import { Observable } from "rxjs/Observable";
import faker from "typescript-json-schema-faker";
import { ContentElement } from "../../classes/content-element";
import { FileServiceData } from "../file-service-data";
import { FileServiceError } from "../file-service-error";
import { FileServiceSD } from "../file-service-sd";
import { IfileService } from "../file-service.interface";
import { ZipFileService } from "../zip-file-service/zip-file.service";

@Injectable()
export class JsonMockFileService implements IfileService {

  constructor(
    private zipFileService: ZipFileService,
  ) {
    jsf.option({
      alwaysFakeOptionals: true,
    });
  }

  public save(fileServiceSD: FileServiceSD): Observable<FileServiceData | FileServiceError> {
    return new Observable<FileServiceData | FileServiceError>((observer) => {
      const ARCHIVE_NAME = "json.mocks";
      const schemaList = (fileServiceSD.serviceTree.toJSONSchemaList() || [])
        .map((schemaCfg) => {
          const jsonMock = faker(schemaCfg.schema);
          return jsonMock && new ContentElement(
            `${schemaCfg.uri}/${schemaCfg.verb}_${schemaCfg.io}.json`,
            JSON.stringify(jsonMock, null, 4),
          );
        }).filter((schemaCfg) => !!schemaCfg);

      if (schemaList.length > 0) {
        const fileServiceData = new FileServiceData();

        fileServiceData.name = fileServiceSD.projectName;
        fileServiceData.archiveName = ARCHIVE_NAME;
        fileServiceData.content = schemaList;

        this.zipFileService.save(fileServiceData).subscribe((out) => {
          observer.next(out);
          observer.complete();
        }, observer.error);

      } else {
        observer.error(new FileServiceError("EMPTY_EXPORT"));
      }
    });
  }
}
