import { ContentElement } from "./../classes/content-element";

export class FileServiceData {
  public name: string;
  public archiveName: string;
  public content: ContentElement[] = [];
  public extension: string = "zip";
  public mimeType: string;
  public fileName: string;
  public blob: Blob;
}
