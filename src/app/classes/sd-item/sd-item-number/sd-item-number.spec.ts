import { SdItemNumber } from "./sd-item-number";
describe("SdItemNumber", () => {
  describe("New SdItemNumber", () => {
    const sdItemNumber = new SdItemNumber();

    it("Should be type number", () => {
      expect(sdItemNumber.type).toBe("number");
    });
  });
});
