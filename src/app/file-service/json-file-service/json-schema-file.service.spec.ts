import { inject, TestBed } from "@angular/core/testing";

import { JsonSchemaFileService } from "./json-schema-file.service";

describe("JsonSchemaFileService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonSchemaFileService],
    });
  });

  it("should be created", inject([JsonSchemaFileService], (service: JsonSchemaFileService) => {
    expect(service).toBeTruthy();
  }));
});
