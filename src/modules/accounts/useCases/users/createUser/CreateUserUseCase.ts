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

    console.log("has user", hasUser)

    if (hasUser) {
      throw Error("User already exists")
    }

    await this.userRepository.create({
      name,
      email,
      password,
      driver_license,
    })
  }
}

export { CreateUserUseCase }
