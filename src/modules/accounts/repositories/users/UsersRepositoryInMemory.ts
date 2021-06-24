import { IUsersRepository, ICreateUserDTO } from "."
import { User } from "../../infra/typeorm/entities/User"

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    })

    console.log("create user", user)

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((u) => u.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find((u) => u.id === id)
  }
}

export { UsersRepositoryInMemory }
