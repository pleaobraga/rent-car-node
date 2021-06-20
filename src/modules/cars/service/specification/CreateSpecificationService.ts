import { ISpecificationRepository } from '../../repository/specifications'

interface IRequest {
  name: string
  description: string
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    const hasSpecification = this.specificationsRepository.findByName(name)

    if (hasSpecification) {
      throw new Error('Specification already exists')
    }

    this.specificationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationService }
