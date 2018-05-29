import { inject, TestBed } from "@angular/core/testing";

import { WsdlFileService } from "./wsdl-file.service";

describe("WsdlFileService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsdlFileService],
    });
  });

  it("should be created", inject([WsdlFileService], (service: WsdlFileService) => {
    expect(service).toBeTruthy();
  }));
});
