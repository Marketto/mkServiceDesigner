import { inject, TestBed } from "@angular/core/testing";
import { ZipFileService } from "./zip-file-service.service";

describe("ZipFileService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZipFileService],
    });
  });

  it("should be created", inject([ZipFileService], (service: ZipFileService) => {
    expect(service).toBeTruthy();
  }));
});
