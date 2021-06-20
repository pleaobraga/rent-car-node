import { Specification } from '../../model'

interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationRepository {
  findByName(name: string): Specification
  //   list(): Category[]
  create({ name, description }: ICreateSpecificationDTO): void
}

export { ISpecificationRepository, ICreateSpecificationDTO }
