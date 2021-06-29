import { sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

import auth from "../../../../../config/auth"
import { IDateProvider } from "../../../../../shared/container/providers/dateProvider/IDateProvider"
import { AppError } from "../../../../../shared/errors/AppErrors"
import { IUsersTokensRepository } from "../../../repositories/usersTokens"

interface IPayload {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      )

    if (!userToken) {
      throw new AppError("Refresh Token does not exist!")
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const expires_date = this.dayjsDateProvider.addDays(
      auth.expires_refresh_token_days
    )

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    })

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    })

    return refresh_token
  }
}

export { RefreshTokenUseCase }
