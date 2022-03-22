interface IMailResetVariables {
  name: string;
  link: string;
}

interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: IMailResetVariables,
    path: string
  ): Promise<void>;
}

export { IMailProvider, IMailResetVariables };
