interface IPasswordHandler {
  passwordHash(passaword: string, rounds: number): Promise<string>;

  passwordCompare(): Promise<boolean>;
}

export { IPasswordHandler };
