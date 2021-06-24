import { User } from "../../infra/typeorm/entities/User"

interface ICreateUserDTO {
  name: string
  email: string
  password: string
  driver_license: string
  avatar?: string
  id?: string
}

interface IUpdateUserDTO {
  id: string
  name: string
  email: string
  password: string
  driver_license: string
  avatar: string
}

interface IUsersRepository {
  create({
    name,
    email,
    password,
    driver_license,
    avatar,
  }: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}

export { IUsersRepository, ICreateUserDTO, IUpdateUserDTO }
