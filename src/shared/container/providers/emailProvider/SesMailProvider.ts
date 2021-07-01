import { SES } from "aws-sdk"
import fs from "fs"
import handlebars from "handlebars"
import nodemailer, { Transporter } from "nodemailer"
import { injectable } from "tsyringe"

import { IEmailProvider, ISendEmailDTO } from "./IEmailProvider"

@injectable()
class SesMailProvider implements IEmailProvider {
  private client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    })
  }

  async sendMail({
    to,
    subject,
    variables,
    path,
  }: ISendEmailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8")

    const templateParse = handlebars.compile(templateFileContent)

    const templateHTML = templateParse(variables)

    await this.client.sendMail({
      to,
      from: "Rentx <pedro@plbraga.com>",
      subject,
      html: templateHTML,
    })
  }
}

export { SesMailProvider }
