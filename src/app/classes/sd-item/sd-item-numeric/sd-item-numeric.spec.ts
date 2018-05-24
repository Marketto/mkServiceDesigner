import { SdItemNumber } from "../sd-item-number/sd-item-number";
describe("SdItemNumeric (abstract)", () => {
  describe("New SdItemNumber", () => {
    const sdItemNumber = new SdItemNumber();
    describe("maxValue", () => {

      it("Should equal assigned maxValue", () => {
        sdItemNumber.minValue = undefined;
        expect(sdItemNumber.minValue).toBeUndefined();
        sdItemNumber.maxValue = 7;
        expect(sdItemNumber.maxValue).toEqual(7);
      });

      it("Should be ignored according to minValue", () => {
        sdItemNumber.maxValue = undefined;
        expect(sdItemNumber.maxValue).toBeUndefined();
        sdItemNumber.minValue = 10;
        expect(sdItemNumber.minValue).toEqual(10);
        sdItemNumber.maxValue = 5;
        expect(sdItemNumber.maxValue).toBeUndefined();
      });

      it("Should correct default value", () => {
        sdItemNumber.minValue = undefined;
        expect(sdItemNumber.minValue).toBeUndefined();
        sdItemNumber.maxValue = undefined;
        expect(sdItemNumber.maxValue).toBeUndefined();
        sdItemNumber.default = 5;
        expect(sdItemNumber.default).toEqual(5);
        sdItemNumber.maxValue = 3;
        expect(sdItemNumber.maxValue).toEqual(3);
        expect(sdItemNumber.default).toEqual(3);
      });
    });

    describe("minValue", () => {

      it("Should equal assigned minValue", () => {
        sdItemNumber.maxValue = undefined;
        expect(sdItemNumber.maxValue).toBeUndefined();
        sdItemNumber.minValue = 3;
        expect(sdItemNumber.minValue).toEqual(3);
      });

      it("Should be ignored according to maxValue", () => {
        sdItemNumber.minValue = undefined;
        expect(sdItemNumber.minValue).toBeUndefined();
        sdItemNumber.maxValue = 6;
        expect(sdItemNumber.maxValue).toEqual(6);
        sdItemNumber.minValue = 10;
        expect(sdItemNumber.minValue).toBeUndefined();
      });

      it("Should correct default value", () => {
        sdItemNumber.minValue = undefined;
        expect(sdItemNumber.minValue).toBeUndefined();
        sdItemNumber.maxValue = undefined;
        expect(sdItemNumber.maxValue).toBeUndefined();
        sdItemNumber.default = 5;
        expect(sdItemNumber.default).toEqual(5);
        sdItemNumber.minValue = 6;
        expect(sdItemNumber.minValue).toEqual(6);
        expect(sdItemNumber.default).toEqual(6);
      });
    });

    describe("default", () => {

      it("Should equal assigned default value", () => {
        sdItemNumber.minValue = undefined;
        expect(sdItemNumber.minValue).toBeUndefined();
        sdItemNumber.maxValue = undefined;
        expect(sdItemNumber.maxValue).toBeUndefined();
        sdItemNumber.default = 5;
        expect(sdItemNumber.default).toEqual(5);
      });

      it("Should be ignored according to maxValue", () => {
        sdItemNumber.minValue = undefined;
        expect(sdItemNumber.minValue).toBeUndefined();
        sdItemNumber.maxValue = 9;
        expect(sdItemNumber.maxValue).toEqual(9);
        sdItemNumber.default = 10;
        expect(sdItemNumber.default).toBeUndefined();
      });

      it("Should be ignored according to minValue", () => {
        sdItemNumber.maxValue = undefined;
        expect(sdItemNumber.maxValue).toBeUndefined();
        sdItemNumber.minValue = 5;
        expect(sdItemNumber.minValue).toEqual(5);
        sdItemNumber.default = 3;
        expect(sdItemNumber.default).toBeUndefined();
      });
    });
  });
});
