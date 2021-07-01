import { resolve } from "path"
import { inject, injectable } from "tsyringe"
import { v4 } from "uuid"

import { IDateProvider } from "../../../../../shared/container/providers/dateProvider/IDateProvider"
import { IEmailProvider } from "../../../../../shared/container/providers/emailProvider/IEmailProvider"
import { AppError } from "../../../../../shared/errors/AppErrors"
import { IUsersRepository } from "../../../repositories/users"
import { IUsersTokensRepository } from "../../../repositories/usersTokens"

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IEmailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User does not exists", 401)
    }

    const refresh_token = v4()

    const expires_date = this.dateProvider.addDays(1)

    await this.usersTokensRepository.create({
      refresh_token,
      user_id: user.id,
      expires_date,
    })

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "views",
      "forgotPassword.hbs"
    )

    const variables = {
      name: user.name,
      link: `${process.env.BASE_URL}/password/reset?token=${refresh_token}`,
    }

    await this.mailProvider.sendMail({
      to: email,
      subject: "Recuperação senha",
      path: templatePath,
      variables,
    })
  }
}

export { SendForgotPasswordMailUseCase }
