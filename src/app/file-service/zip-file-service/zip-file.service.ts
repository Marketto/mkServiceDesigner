import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { saveAs } from "file-saver/FileSaver";
import * as JSZip from "jszip";
import { Observable } from "rxjs";
import { FileServiceData } from "../file-service-data";
import { FileServiceError } from "../file-service-error";
import { IfileService } from "../file-service.interface";

@Injectable()
export class ZipFileService implements IfileService {

  constructor(
    private translate: TranslateService,
  ) { }

  public save(fileServiceInput: FileServiceData): Observable<FileServiceData|FileServiceError> {
    return new Observable((observer) => {
      const zip = new JSZip();
      fileServiceInput.content.forEach((e) => {
        zip.file(e.filePath, e.data);
      });
      zip.generateAsync({
        compression: "DEFLATE",
        compressionOptions: {
          level: 9,
        },
        mimeType: fileServiceInput.mimeType,
        type: "blob",
      }).then((blobData) => {
        const fileServiceOutput = new FileServiceData(fileServiceInput);
        fileServiceOutput.blob = blobData;

        if (!fileServiceOutput.name) {
          this.translate.get("DEFAULT.FILE_NAME").toPromise().then((projectName) => {
            fileServiceOutput.name = projectName;
            fileServiceOutput.fileName = this.getExportFileName(fileServiceOutput);
            saveAs(fileServiceOutput.blob, fileServiceOutput.fileName);
            observer.next(fileServiceOutput);
            observer.complete();
          }, (err) => {
            observer.error(new FileServiceError("EXPORT_ERR", err));
          });
        } else {
          fileServiceOutput.fileName = this.getExportFileName(fileServiceOutput);
          saveAs(fileServiceOutput.blob, fileServiceOutput.fileName);
          observer.next(fileServiceOutput);
          observer.complete();
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
