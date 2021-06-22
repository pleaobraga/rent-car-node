import { inject, injectable } from "tsyringe"

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
      throw new Error("Specification already exists")
    }

    this.specificationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }
