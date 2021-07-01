import fs from "fs"
import handlebars from "handlebars"
import nodemailer, { Transporter } from "nodemailer"
import { injectable } from "tsyringe"

import { IEmailProvider, ISendEmailDTO } from "./IEmailProvider"

@injectable()
class EtherealMailProvider implements IEmailProvider {
  private client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })

        this.client = transporter
      })
      .catch((err) => console.log(err))
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

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreply@rentx.com.br>",
      subject,
      html: templateHTML,
    })

    console.log("message sent: %s", message.messageId)
    console.log("preview URL: %s", nodemailer.getTestMessageUrl(message))
  }
}

export { EtherealMailProvider }
