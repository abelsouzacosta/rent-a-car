import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider, IMailResetVariables } from "../IMailProvider";

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

  async sendMail(
    to: string,
    subject: string,
    variables: IMailResetVariables,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHtml = templateParse(variables);

    const message = {
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      html: templateHtml,
    };

    const sendMail = await this.client.sendMail(message);

    console.log("Message sent: %s", sendMail.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sendMail));
  }
}

export { EtherealMailProvider };
