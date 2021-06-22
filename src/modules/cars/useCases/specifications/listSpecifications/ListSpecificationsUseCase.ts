import { inject, injectable } from "tsyringe"

import { Specification } from "../../../entities"
import { ISpecificationRepository } from "../../../repository/specifications"

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const list = await this.specificationRepository.list()

    return list
  }
}

export { ListSpecificationsUseCase }
