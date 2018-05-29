import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import faker from "typescript-json-schema-faker";
import { ContentElement } from "../../classes/content-element";
import { FileServiceSD } from "../file-service-sd";
import { ZipFileService } from "../zip-file-service/zip-file.service";
import { FileServiceData } from "./../file-service-data";
import { FileServiceError } from "./../file-service-error";
import { IfileService } from "./../file-service.interface";

@Injectable()
export class MockettaroFileService implements IfileService {

  constructor(
    private zipFileService: ZipFileService,
  ) {}

  public save(fileServiceSD: FileServiceSD): Observable<FileServiceData | FileServiceError > {
    return new Observable<FileServiceData | FileServiceError>((observer) => {

      const ARCHIVE_NAME = "mockettaro.package";
      const schemaList = (fileServiceSD.serviceTree.toJSONSchemaList() || [])
        .map((mkpkgCfg) => {
          const path = `${mkpkgCfg.uri.replace(/(\{\w+\})/igm, "default")}.${mkpkgCfg.verb}`;
          if (mkpkgCfg.io === "request") {
            return new ContentElement(
              `${path}.schema.json`,
              JSON.stringify(mkpkgCfg.schema, null, 4),
            );
          } else if (mkpkgCfg.io === "response") {
            const jsonMock = faker(mkpkgCfg.schema);
            return jsonMock && new ContentElement(
              `${path}.json`,
              JSON.stringify(jsonMock, null, 4),
            );
          }
        }).filter((mkpkgCfg) => !!mkpkgCfg);

      if (schemaList.length > 0) {
        const fileServiceData = new FileServiceData();

        fileServiceData.name = fileServiceSD.projectName;
        fileServiceData.archiveName = ARCHIVE_NAME;
        fileServiceData.content = schemaList;

        this.zipFileService.save(fileServiceData).subscribe(observer.next, observer.error);
      } else {
        observer.error(new FileServiceError("EMPTY_EXPORT"));
      }
    });
  }
}
