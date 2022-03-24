import { IMailProvider, IMailResetVariables } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  async sendMail(
    to: string,
    subject: string,
    variables: IMailResetVariables,
    path: string
  ): Promise<void> {
    console.log(`
      Mensagem Enviada para: ${to},
      Assunto: ${subject},
      Corpo: ${variables},
      Templte: ${path}
    `);
  }
}

export { MailProviderInMemory };
