import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { xml } from "xml-decorators";
import { ContentElement } from "../../classes/content-element";
import { FileServiceError } from "../file-service-error";
import { FileServiceSD } from "../file-service-sd";
import { IfileService } from "../file-service.interface";
import { ZipFileService } from "../zip-file-service/zip-file.service";
import { FileServiceData } from "./../file-service-data";

@Injectable()
export class WsdlFileService implements IfileService {

  constructor(
    private zipFileService: ZipFileService,
  ) {}

  public save(fileServiceSD: FileServiceSD): Observable<FileServiceData | FileServiceError> {
    return new Observable < FileServiceData | FileServiceError>((observer) => {
      const ARCHIVE_NAME = "wsdl";
      const schemaList = fileServiceSD.serviceTree.flatList();
      if ((schemaList || []).length > 0) {
        const contentList = schemaList.map((xsd) => {
            return new ContentElement(`${xsd.verbs.address}.wsdl`, xml.serialize(xsd));
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
