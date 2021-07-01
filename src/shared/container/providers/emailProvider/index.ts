import { container } from "tsyringe"

import { EtherealMailProvider } from "./EtherealMailProvider"
import { IEmailProvider } from "./IEmailProvider"
import { SesMailProvider } from "./SesMailProvider"

export { EtherealMailProvider } from "./EtherealMailProvider"
export { IEmailProvider } from "./IEmailProvider"
export { SesMailProvider } from "./SesMailProvider"

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SesMailProvider),
}

container.registerInstance<IEmailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
)
