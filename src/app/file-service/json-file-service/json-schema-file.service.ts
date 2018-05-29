import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ContentElement } from "../../classes/content-element";
import { FileServiceError } from "../file-service-error";
import { IfileService } from "../file-service.interface";
import { FileServiceData } from "./../file-service-data";
import { FileServiceSD } from "./../file-service-sd";
import { ZipFileService } from "./../zip-file-service/zip-file.service";

@Injectable()
export class JsonSchemaFileService implements IfileService {

  constructor(
    public zipFileService: ZipFileService,
  ) {}

  public save(fileServiceSD: FileServiceSD): Observable<FileServiceData | FileServiceError> {
    return new Observable<FileServiceData | FileServiceError>((observer) => {
      const ARCHIVE_NAME = "json.schema";
      const schemaList = fileServiceSD.serviceTree.toJSONSchemaList() || [];
      if (schemaList.length > 0) {
        const contentList = schemaList.map((schemaCfg) => {
          return new ContentElement(
            `${schemaCfg.uri}/${schemaCfg.verb}_${schemaCfg.io}.json`,
            JSON.stringify(schemaCfg.schema, null, 4),
          );
        });

        const fileServiceData = new FileServiceData();

        fileServiceData.name = fileServiceSD.projectName;
        fileServiceData.archiveName = ARCHIVE_NAME;
        fileServiceData.content = contentList;

        this.zipFileService.save(fileServiceData).subscribe(observer.next, observer.error);

      } else {
        observer.error(new FileServiceError("EMPTY_EXPORT"));
      }
    });
  }
}
