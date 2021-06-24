import { ICategoryRepository, ICreateCategoryDTO } from "."
import { Category } from "../../infra/typeorm/entities"

class CategoriesRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = []

  async findByName(name: string): Promise<Category> {
    return this.categories.find((c) => c.name === name)
  }

  async list(): Promise<Category[]> {
    return this.categories
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, { name, description })

    this.categories.push(category)
  }
}

export { CategoriesRepositoryInMemory }
