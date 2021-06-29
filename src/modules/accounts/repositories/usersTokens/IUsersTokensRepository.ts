import { UserTokens } from "../../infra/typeorm/entities/UserTokens"

interface ICreateUserTokenDTO {
  user_id: string
  expires_date: Date
  refresh_token: string
}

interface IUsersTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens>
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>
  deleteById(id: string): Promise<void>
}

export { IUsersTokensRepository, ICreateUserTokenDTO }
