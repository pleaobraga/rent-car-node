interface ISendEmailDTO {
  to: string
  subject: string
  variables: any
  path: string
}

interface IEmailProvider {
  sendMail(data: ISendEmailDTO): Promise<void>
}

export { ISendEmailDTO, IEmailProvider }
