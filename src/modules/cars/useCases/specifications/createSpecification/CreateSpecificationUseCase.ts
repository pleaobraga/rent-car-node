import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../../errors/AppErrors"

import { ISpecificationRepository } from "../../../repository/specifications"

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
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
