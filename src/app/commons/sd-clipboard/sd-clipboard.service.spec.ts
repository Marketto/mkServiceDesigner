import { inject, TestBed } from "@angular/core/testing";

import { SdClipboardService } from "./sd-clipboard.service";

describe("SdClipboardService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SdClipboardService],
    });
  });

  it("should be created", inject([SdClipboardService], (service: SdClipboardService) => {
    expect(service).toBeTruthy();
  }));
});
