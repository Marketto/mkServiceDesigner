import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { saveAs } from "file-saver/FileSaver";
import * as JSZip from "jszip";
import { Observable } from "rxjs/Observable";
import { ContentElement } from "../../classes/content-element";
import { FileServiceData } from "../file-service-data";
import { FileServiceError } from "../file-service-error";
import { IfileService } from "../file-service.interface";

@Injectable()
export class ZipFileService implements IfileService {

  constructor(
    private translate: TranslateService,
  ) { }

  public save(fileServiceData: FileServiceData): Observable<FileServiceData|FileServiceError> {
    return new Observable((observer) => {
      const zip = new JSZip();
      fileServiceData.content.forEach((e) => {
        zip.file(e.filePath, e.data);
      });
      zip.generateAsync({
        compression: "DEFLATE",
        compressionOptions: {
          level: 9,
        },
        mimeType: fileServiceData.mimeType,
        type: "blob",
      }).then((blobData) => {
        fileServiceData.blob = blobData;
        if (!fileServiceData.name) {
          this.translate.get("DEFAULT.FILE_NAME").toPromise().then((projectName) => {
            fileServiceData.name = projectName;
            fileServiceData.fileName = this.getExportFileName(fileServiceData);
            saveAs(fileServiceData.blob, fileServiceData.fileName);
            observer.next(fileServiceData);
          }, (err) => {
            observer.error(new FileServiceError("EXPORT_ERR", err));
          });
        } else {
          fileServiceData.fileName = this.getExportFileName(fileServiceData);
          saveAs(fileServiceData.blob, fileServiceData.fileName);
          observer.next(fileServiceData);
        }
      }, (err) => {
        observer.error(new FileServiceError("EXPORT_ERR", err));
      });
    });
  }

  private getExportFileName(fileServiceData: FileServiceData): string {
    return fileServiceData.fileName || (
      fileServiceData.archiveName ?
      `${fileServiceData.name}.${fileServiceData.archiveName}.${fileServiceData.extension}` :
      `${fileServiceData.name}.${fileServiceData.extension}`
    );
  }
}
