import { inject, TestBed } from "@angular/core/testing";

import { MksdFileService } from "./mksd-file.service";

describe("MksdFileService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MksdFileService],
    });
  });

  it("should be created", inject([MksdFileService], (service: MksdFileService) => {
    expect(service).toBeDefined();
  }));
});
