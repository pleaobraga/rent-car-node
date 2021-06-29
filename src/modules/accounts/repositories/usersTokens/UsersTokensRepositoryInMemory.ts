import { UserTokens } from "../../infra/typeorm/entities/UserTokens"
import {
  ICreateUserTokenDTO,
  IUsersTokensRepository,
} from "./IUsersTokensRepository"

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = []

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    })

    this.usersTokens.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      (u) => u.user_id === user_id && u.refresh_token === refresh_token
    )
  }

  async deleteById(id: string): Promise<void> {
    const index = this.usersTokens.findIndex((u) => u.id === id)

    this.usersTokens.splice(index)
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find((u) => u.refresh_token === refresh_token)
  }
}

export { UsersTokensRepositoryInMemory }
