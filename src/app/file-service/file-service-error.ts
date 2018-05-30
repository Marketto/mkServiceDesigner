export class FileServiceError extends Error {
  public code: string;

  constructor(errorCode: string, err?: Error ) {
    super();
    this.code = errorCode;
    if (err) {
      this.message = err.message;
      this.name = err.name;
      this.stack = err.stack;
    }
  }
}
