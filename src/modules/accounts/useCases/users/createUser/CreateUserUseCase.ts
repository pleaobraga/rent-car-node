import { hash } from "bcrypt"
import { inject, injectable } from "tsyringe"

import { ICreateUserDTO, IUsersRepository } from "../../../repositories/users"

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const hasUser = await this.userRepository.findByEmail(email)

    if (hasUser) {
      throw Error("User already exists")
    }

    const hashPassword = await hash(password, 8)

    await this.userRepository.create({
      name,
      email,
      password: hashPassword,
      driver_license,
    })
  }
}

export { CreateUserUseCase }
