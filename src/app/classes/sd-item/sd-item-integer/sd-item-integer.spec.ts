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

    /*
    describe("multipleOf", () => {
      sdItemInteger.multipleOf = 11;
      it("Should allow only valid default value", () => {
        expect(sdItemInteger.default).toBeUndefined();
        sdItemInteger.default = 5;
        expect(sdItemInteger.default).toBeUndefined();
        sdItemInteger.default = 21.8;
        expect(sdItemInteger.default).toEqual(22);
      });

      it("Should allow only valid minValue", () => {
        expect(sdItemInteger.minValue).toBeUndefined();
        sdItemInteger.minValue = 9;
        expect(sdItemInteger.minValue).toBeUndefined();
        sdItemInteger.minValue = 11.1;
        expect(sdItemInteger.minValue).toEqual(11);
      });

      it("Should allow only valid maxValue", () => {
        expect(sdItemInteger.maxValue).toBeUndefined();
        sdItemInteger.maxValue = 6;
        expect(sdItemInteger.maxValue).toBeUndefined();
        sdItemInteger.maxValue = 33;
        expect(sdItemInteger.maxValue).toEqual(33);
      });
    });
    */

  });
});
