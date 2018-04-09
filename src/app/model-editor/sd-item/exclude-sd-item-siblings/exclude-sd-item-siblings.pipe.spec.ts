import { ExcludeSdItemSiblingsPipe } from "./exclude-sd-item-siblings.pipe";

describe("ExcludeSiblingsPipe", () => {
  it("create an instance", () => {
    const pipe = new ExcludeSdItemSiblingsPipe();
    expect(pipe).toBeTruthy();
  });
});
