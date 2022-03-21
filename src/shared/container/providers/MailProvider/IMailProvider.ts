interface IMailProvider {
  sendMail(to: string, from: string, body: string): Promise<void>;
}

export { IMailProvider };
