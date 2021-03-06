import { SdItemNumber } from "../sd-item-number/sd-item-number";
describe("SdItemNumeric (abstract)", () => {
  describe("New SdItemNumber", () => {
    const sdItemNumber = new SdItemNumber();

    function resetItem() {
      sdItemNumber.minValue = undefined;
      expect(sdItemNumber.minValue).toBeUndefined();
      sdItemNumber.maxValue = undefined;
      expect(sdItemNumber.maxValue).toBeUndefined();
      sdItemNumber.default = undefined;
      expect(sdItemNumber.default).toBeUndefined();
      sdItemNumber.exclusiveMin = false;
      expect(sdItemNumber.exclusiveMin).toBe(false);
      sdItemNumber.exclusiveMax = false;
      expect(sdItemNumber.exclusiveMax).toBe(false);
      sdItemNumber.multipleOf = undefined;
      expect(sdItemNumber.multipleOf).toBeUndefined();
    }

    describe("maxValue", () => {

      it("Should equal assigned maxValue", () => {
        resetItem();
        sdItemNumber.maxValue = 7;
        expect(sdItemNumber.maxValue).toEqual(7);
      });

      it("Should be ignored according to minValue (≥)", () => {
        resetItem();
        sdItemNumber.minValue = 10;
        expect(sdItemNumber.minValue).toEqual(10);
        sdItemNumber.maxValue = 5;
        expect(sdItemNumber.maxValue).toBeUndefined();
      });

      it("Should be ignored according to minValue (>)", () => {
        resetItem();
        sdItemNumber.exclusiveMax = true;
        expect(sdItemNumber.exclusiveMax).toBe(true);
        sdItemNumber.minValue = 10;
        expect(sdItemNumber.minValue).toEqual(10);
        sdItemNumber.maxValue = 10;
        expect(sdItemNumber.maxValue).toBeUndefined();
      });

      it("Should correct default value (≥)", () => {
        resetItem();
        sdItemNumber.default = 5;
        expect(sdItemNumber.default).toEqual(5);
        sdItemNumber.maxValue = 3;
        expect(sdItemNumber.maxValue).toEqual(3);
        expect(sdItemNumber.default).toEqual(3);
      });

      it("Should correct default value (>)", () => {
        resetItem();
        sdItemNumber.exclusiveMax = true;
        expect(sdItemNumber.exclusiveMax).toBe(true);
        sdItemNumber.default = 5;
        expect(sdItemNumber.default).toEqual(5);
        sdItemNumber.maxValue = 3;
        expect(sdItemNumber.maxValue).toEqual(3);
        expect(sdItemNumber.default).toBeUndefined();
      });
    });

    describe("minValue", () => {

      it("Should equal assigned minValue", () => {
        resetItem();
        sdItemNumber.minValue = 3;
        expect(sdItemNumber.minValue).toEqual(3);
      });

      it("Should be ignored according to maxValue (≤)", () => {
        resetItem();
        sdItemNumber.maxValue = 6;
        expect(sdItemNumber.maxValue).toEqual(6);
        sdItemNumber.minValue = 10;
        expect(sdItemNumber.minValue).toBeUndefined();
      });

      it("Should accept same value as maxValue (≤)", () => {
        resetItem();
        sdItemNumber.maxValue = 6;
        expect(sdItemNumber.maxValue).toEqual(6);
        sdItemNumber.minValue = 6;
        expect(sdItemNumber.minValue).toEqual(6);
      });

      it("Should be ignored if equal to maxValue (<)", () => {
        resetItem();
        sdItemNumber.exclusiveMin = true;
        expect(sdItemNumber.exclusiveMin).toBe(true);

        sdItemNumber.maxValue = 6;
        expect(sdItemNumber.maxValue).toEqual(6);
        sdItemNumber.minValue = 6;
        expect(sdItemNumber.minValue).toBeUndefined();
      });

      it("Should correct default value", () => {
        resetItem();
        sdItemNumber.default = 5;
        expect(sdItemNumber.default).toEqual(5);
        sdItemNumber.minValue = 6;
        expect(sdItemNumber.minValue).toEqual(6);
        expect(sdItemNumber.default).toEqual(6);
      });
    });

    describe("default", () => {

      it("Should equal assigned default value", () => {
        resetItem();
        sdItemNumber.default = 5;
        expect(sdItemNumber.default).toEqual(5);
      });

      it("Should be ignored according to maxValue", () => {
        resetItem();
        sdItemNumber.default = 6;
        expect(sdItemNumber.default).toEqual(6);
        sdItemNumber.maxValue = 9;
        expect(sdItemNumber.maxValue).toEqual(9);
        sdItemNumber.default = 10;
        expect(sdItemNumber.default).toEqual(6);
      });

      it("Should be ignored according to minValue", () => {
        resetItem();
        sdItemNumber.default = 5;
        expect(sdItemNumber.default).toEqual(5);
        sdItemNumber.minValue = 5;
        expect(sdItemNumber.minValue).toEqual(5);
        sdItemNumber.default = 3;
        expect(sdItemNumber.default).toEqual(5);
      });
    });

    describe("multipleOf", () => {
      it("Should allow only valid default value", () => {
        resetItem();
        sdItemNumber.multipleOf = 11;
        expect(sdItemNumber.multipleOf).toEqual(11);
        sdItemNumber.default = 5;
        expect(sdItemNumber.default).toBeUndefined();
        sdItemNumber.default = 22;
        expect(sdItemNumber.default).toEqual(22);
      });

      it("Should allow only valid maxValue", () => {
        resetItem();
        sdItemNumber.multipleOf = 11;
        expect(sdItemNumber.multipleOf).toEqual(11);
        sdItemNumber.maxValue = 6;
        expect(sdItemNumber.maxValue).toBeUndefined();
        sdItemNumber.maxValue = 30;
        expect(sdItemNumber.maxValue).toEqual(30);
      });

      it("Should correct default value", () => {
        resetItem();
        sdItemNumber.default = 7;
        expect(sdItemNumber.default).toEqual(7);
        sdItemNumber.multipleOf = 5;
        expect(sdItemNumber.multipleOf).toEqual(5);
        expect(sdItemNumber.default).toEqual(5);
      });
    });
  });
});
