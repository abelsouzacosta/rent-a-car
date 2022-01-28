class ApplicationError extends Error {
  public readonly message: string;
  public readonly status: number;
  public readonly fileName: string;
  public readonly dirName: string;

  constructor(
    message: string,
    status: number,
    fileName: string,
    dirName: string
  ) {
    super(message);
    Object.assign(this, { message, status, fileName, dirName });
  }
}

export { ApplicationError };
