import { Category } from '../../model'
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository'

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[]

  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    return CategoriesRepository.INSTANCE
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
