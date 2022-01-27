interface IPasswordHandler {
  passwordHash(passaword: string, rounds: number): Promise<string>;

  passwordCompare(password: string, hash: string): Promise<boolean>;
}

export { IPasswordHandler };
