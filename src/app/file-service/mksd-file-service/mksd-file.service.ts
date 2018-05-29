import { Injectable } from "@angular/core";
import * as JSZip from "jszip";
import { Observable } from "rxjs/Observable";
import { IfileService } from "../file-service.interface";
import { SdServiceTreeItem } from "./../../classes/sd-service/sd-service-tree-item";
import { FileServiceData } from "./../file-service-data";
import { FileServiceError } from "./../file-service-error";
import { FileServiceSD } from "./../file-service-sd";
import { ZipFileService } from "./../zip-file-service/zip-file.service";

@Injectable()
export class MksdFileService implements IfileService {

  public static mimeType = "application/x-mk-service-designer";
  public static extension = "mksd";

  private static rootJsonFileName = "serviceRoot.json";

  constructor(
    private zipFileService: ZipFileService,
  ) { }

  public save(fileServiceSD: FileServiceSD): Observable<FileServiceData | FileServiceError> {
    return new Observable<FileServiceData | FileServiceError>((observer) => {
      const mksdRawFile = [{
        data: JSON.stringify(fileServiceSD.serviceTree),
        filePath: MksdFileService.rootJsonFileName,
      }];
      const fileServiceData = new FileServiceData();

      fileServiceData.name = fileServiceSD.projectName;
      fileServiceData.content = mksdRawFile;
      fileServiceData.mimeType = MksdFileService.mimeType;
      fileServiceData.extension = MksdFileService.extension;

      this.zipFileService.save(fileServiceData).subscribe(observer.next, observer.error);
    });
  }

  public load(file: File): Observable<FileServiceSD | FileServiceError> {
    return new Observable<FileServiceSD | FileServiceError>((observer) => {
      const mksdFile = new JSZip();
      mksdFile.loadAsync(file).then((archive) => {
        if (archive.files[MksdFileService.rootJsonFileName]) {
          archive.files[MksdFileService.rootJsonFileName].async("blob").then((sourceFile) => {
            const fileReader = new FileReader();
            fileReader.readAsBinaryString(sourceFile);
            fileReader.onload = () => {
              const fileServiceSD = new FileServiceSD({
                projectName: file.name.replace(`.${MksdFileService.extension}`, ""),
                  serviceTree: JSON.parse(fileReader.result, SdServiceTreeItem.fromJSON),
                });
              observer.next(fileServiceSD);
            };
            fileReader.onerror = (progressEvent) => {
              observer.error(new FileServiceError("FILE_READING"));
            };
          }, (err) => {
            observer.error(new FileServiceError("ZIP_FETCHER", err));
          });
        }
      }, (err) => {
        observer.error(new FileServiceError("ZIP_LOADING", err));
      });
    });
  }

}
