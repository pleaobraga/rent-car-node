import { Specification } from "../../infra/typeorm/entities"
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "./ISpecificationsRepository"

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = []

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((s) => s.name === name)
  }

  async list(): Promise<Specification[]> {
    return this.specifications
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
    })

    this.specifications.push(specification)

    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((s) => ids.includes(s.id))
  }
}

export { SpecificationsRepositoryInMemory }
