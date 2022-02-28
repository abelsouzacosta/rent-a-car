class ApplicationError extends Error {
  public readonly message: string;
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    Object.assign(this, { message, status });
  }
}

export { ApplicationError };
