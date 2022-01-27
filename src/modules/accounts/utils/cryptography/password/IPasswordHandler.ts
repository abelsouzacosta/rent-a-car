interface IPasswordHandler {
  passwordHash(password: string, rounds: number): Promise<string>;

  passwordCompare(password: string, hash: string): Promise<boolean>;
}

export { IPasswordHandler };
