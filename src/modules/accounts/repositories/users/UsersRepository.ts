import { getRepository, Repository } from "typeorm"

import { IUsersRepository, ICreateUserDTO } from "."
import { User } from "../../entities/User"

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    })

    console.log("user", user)

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      email,
    })

    return user
  }
}

export { UsersRepository }
