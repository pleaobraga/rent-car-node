import { ICreateSpecificationDTO, ISpecificationRepository } from '.'
import { Specification } from '../../entities'

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[]

  private static INSTANCE: SpecificationRepository

  private constructor() {
    this.specifications = []
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository()
    }

    return SpecificationRepository.INSTANCE
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
