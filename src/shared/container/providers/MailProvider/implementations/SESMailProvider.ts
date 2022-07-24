import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailResetVariables } from "../IMailProvider";

class SESMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_EMAIL_REGION,
      }),
    });
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
      from: process.env.AWS_EMAIL_ADDRESS,
      html: templateHtml,
    };

    await this.client.sendMail(message);
  }
}

export { SESMailProvider };
