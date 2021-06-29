import { hash } from "bcrypt"
import { inject, injectable } from "tsyringe"

import { IDateProvider } from "../../../../../shared/container/providers/dateProvider/IDateProvider"
import { AppError } from "../../../../../shared/errors/AppErrors"
import { IUsersRepository } from "../../../repositories/users"
import { IUsersTokensRepository } from "../../../repositories/usersTokens"

interface IResquest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IResquest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError("token invalid")
    }

    if (
      this.dateProvider.compareDays(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("token expired")
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUseCase }
