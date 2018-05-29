export class FileServiceError extends Error {
  private $errorCode: string;
  public get code() {
    return this.$errorCode;
  }

  constructor(errorCode: string, err?: Error ) {
    super();
    this.$errorCode = errorCode;
    if (err) {
      this.message = err.message;
      this.name = err.name;
      this.stack = err.stack;
    }
  }
}
