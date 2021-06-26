import { inject, injectable } from "tsyringe"

import { Specification } from "../../../infra/typeorm/entities"
import { ISpecificationsRepository } from "../../../repository/specifications"

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const list = await this.specificationsRepository.list()

    return list
  }
}

export { ListSpecificationsUseCase }
