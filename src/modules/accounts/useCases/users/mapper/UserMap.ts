import { classToClass } from "class-transformer"

import { User } from "../../../infra/typeorm/entities"

interface IUserResponseDTO {
  email: string
  name: string
  id: string
  avatar: string
  driver_license: string
  avatar_url(): string
}

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    })

    return user
  }
}

export { UserMap, IUserResponseDTO }
