import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "../../../repositories/users"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error("Email or password incorrect")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("Email or password incorrect")
    }

    const token = sign({}, "142578idqwjdjiu", {
      subject: user.id,
      expiresIn: "1d",
    })

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    }
  }
}

export { AuthenticateUserUseCase }
