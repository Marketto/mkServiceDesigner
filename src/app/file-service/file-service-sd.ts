import { SdServiceTreeItem } from "./../classes/sd-service/sd-service-tree-item";

export class FileServiceSD {
  public serviceTree: SdServiceTreeItem;
  public projectName: string;

  constructor(input: FileServiceSD|any) {
    if (input) {
      this.serviceTree = input.serviceTree;
      this.projectName = input.projectName;
    }
  }
}
