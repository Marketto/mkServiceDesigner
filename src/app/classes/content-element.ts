export class ContentElement {
  public filePath: string;
  public data: string | Blob;

  constructor(filePath?: string, data?: string | Blob) {
    this.filePath = filePath;
    this.data = data;
  }
}
