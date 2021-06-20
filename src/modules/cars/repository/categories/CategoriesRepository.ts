import { Category } from '../../model'
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository'

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[]

  constructor() {
    this.categories = []
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category({
      name,
      description,
    })

    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category {
    return this.categories.find((c) => c.name === name)
  }
}

export { CategoriesRepository }
