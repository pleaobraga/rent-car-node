import { inject, injectable } from "tsyringe"

import { User } from "../../../infra/typeorm/entities"
import { IUsersRepository } from "../../../repositories/users"
import { IUserResponseDTO, UserMap } from "../mapper/UserMap"

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id)

    return UserMap.toDTO(user)
  }
}

export { ProfileUserUseCase }
