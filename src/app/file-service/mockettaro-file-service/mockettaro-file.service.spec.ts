import { inject, TestBed } from "@angular/core/testing";

import { MockettaroFileService } from "./mockettaro-file.service";

describe("MockettaroFileService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockettaroFileService],
    });
  });

  it("should be created", inject([MockettaroFileService], (service: MockettaroFileService) => {
    expect(service).toBeDefined();
  }));
});
