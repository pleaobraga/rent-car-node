import { ICreateSpecificationDTO, ISpecificationRepository } from '.'
import { Specification } from '../../model'

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification({
      name,
      description,
    })

    this.specifications.push(specification)
  }

  list(): Specification[] {
    return this.specifications
  }

  findByName(name: string): Specification {
    return this.specifications.find((c) => c.name === name)
  }
}

export { SpecificationRepository }
