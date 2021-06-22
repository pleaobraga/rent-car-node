import { Category } from "../../../entities"
import { ICategoryRepository } from "../../../repository/categories"

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()

    return categories
  }
}

export { ListCategoriesUseCase }
