import { inject, TestBed } from "@angular/core/testing";
import { JsonMockFileService } from "./json-mock-file.service";

describe("JsonMockFileService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonMockFileService],
    });
  });

  it("should be created", inject([JsonMockFileService], (service: JsonMockFileService) => {
    expect(service).toBeTruthy();
  }));
});
