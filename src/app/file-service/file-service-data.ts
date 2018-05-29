import { ContentElement } from "./../classes/content-element";

export class FileServiceData {
  public name: string;
  public archiveName: string;
  public content: ContentElement[] = [];
  public extension: string = "zip";
  public mimeType: string;
  public fileName: string;
  public blob: Blob;

  constructor(input?: FileServiceData|any) {
    if (input) {
      this.name = input.name;
      this.archiveName = input.archiveName;
      this.content = input.content;
      this.extension = input.extension;
      this.mimeType = input.mimeType;
      this.fileName = input.fileName;
      this.blob = input.blob;
    }
  }
}
