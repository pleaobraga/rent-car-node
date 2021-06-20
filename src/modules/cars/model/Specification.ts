import { v4 as uuidv4 } from 'uuid'

interface ISpecification {
  id?: string
  name: string
  description: string
  create_at: Date
}

class Specification {
  id?: string
  name: string
  description: string
  create_at: Date

  constructor({ name, description }: Partial<ISpecification>) {
    if (!this.id) {
      this.id = uuidv4()
    }

    this.description = description
    this.name = name
    this.create_at = new Date()
  }
}

export { Specification }
