import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        this.client = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
      })
      .catch((err) => console.error(err));
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const message = {
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      text: body,
      html: body,
    };

    const sendMail = await this.client.sendMail(message);

    console.log("Message sent: %s", sendMail.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sendMail));
  }
}

export { EtherealMailProvider };
