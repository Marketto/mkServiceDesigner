import { SdItemInteger } from "./sd-item-integer";
describe("SdItemInteger", () => {
  describe("New SdItemInteger", () => {
    const sdItemInteger = new SdItemInteger();

    it("Should be type integer", () => {
      expect(sdItemInteger.type).toBe("integer");
    });

    it("Should round float minValue", () => {
      sdItemInteger.maxValue = null;
      expect(sdItemInteger.maxValue).toBeUndefined();
      sdItemInteger.minValue = 3.1324;
      expect(sdItemInteger.minValue).toEqual(3);
    });

    it("Should round float maxValue", () => {
      sdItemInteger.minValue = null;
      expect(sdItemInteger.minValue).toBeUndefined();
      sdItemInteger.maxValue = 8.7324;
      expect(sdItemInteger.maxValue).toEqual(9);
    });

    it("Should round float default", () => {
      sdItemInteger.minValue = null;
      expect(sdItemInteger.minValue).toBeUndefined();
      sdItemInteger.maxValue = null;
      expect(sdItemInteger.maxValue).toBeUndefined();
      sdItemInteger.default = 1.491;
      expect(sdItemInteger.default).toEqual(1);
    });

    it("Should round multipleOf", () => {
      sdItemInteger.multipleOf = 7.4;
      expect(sdItemInteger.multipleOf).toEqual(7);
    });

  });
});
