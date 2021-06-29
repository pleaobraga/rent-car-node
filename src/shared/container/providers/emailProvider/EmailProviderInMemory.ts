import { IEmailProvider, ISendEmailDTO } from "./IEmailProvider"

class EmailProviderInMemory implements IEmailProvider {
  private messages: any[] = []

  async sendMail({
    to,
    subject,
    variables,
    path,
  }: ISendEmailDTO): Promise<void> {
    this.messages.push({
      to,
      from: "Rentx <noreply@rentx.com.br>",
      subject,
      variables,
      path,
    })
  }
}

export { EmailProviderInMemory }
