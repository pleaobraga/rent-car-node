import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../../shared/errors/AppErrors"

import { ISpecificationsRepository } from "../../../repository/specifications"

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const hasSpecification = await this.specificationsRepository.findByName(
      name
    )

    if (hasSpecification) {
      throw new AppError("Specification already exists", 403)
    }

    this.specificationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }
