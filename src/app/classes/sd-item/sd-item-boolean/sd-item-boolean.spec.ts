import { SdItemString } from "../sd-item-string/sd-item-string";
import { SdItemBoolean } from "./sd-item-boolean";

describe("SdItemBoolean", () => {
  describe("New SdItemBoolean", () => {
    it("Should be type boolean and default undefined", () => {
      const sdItemBoolean = new SdItemBoolean();
      expect(sdItemBoolean.default).toBeUndefined();
      expect(sdItemBoolean.type).toBe("boolean");
    });
    it("Should have name 'Test' and default true", () => {
      const sdItemBoolean1 = new SdItemBoolean();

      sdItemBoolean1.default = true;
      sdItemBoolean1.name = "Test";

      const sdItemBoolean2 = new SdItemBoolean(sdItemBoolean1);

      expect(sdItemBoolean2.default).toBeTruthy();
      expect(sdItemBoolean2.name).toEqual("Test");
    });
  });

  describe("SdItem => SdItemBoolean", () => {
    it("Should be type boolean, default undefined and have name 'Test'", () => {
      const sdItemString = new SdItemString();
      sdItemString.default = "test";
      sdItemString.name = "Test";

      const sdItemBoolean = new SdItemBoolean(sdItemString);

      expect(sdItemBoolean.default).toBeUndefined();
      expect(sdItemBoolean.type).toBe("boolean");
      expect(sdItemBoolean.name).toEqual("Test");
    });
  });
});
