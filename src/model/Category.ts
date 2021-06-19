import { v4 as uuidv4 } from 'uuid'

interface ICategory {
  id?: string
  name: string
  description: string
  create_at: Date
}

class Category implements ICategory {
  id?: string
  name: string
  description: string
  create_at: Date

  constructor({ name, description }: Partial<ICategory>) {
    if (!this.id) {
      this.id = uuidv4()
    }

    this.description = description
    this.name = name
    this.create_at = new Date()
  }
}

export { Category }
