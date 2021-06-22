import { inject, injectable } from "tsyringe"

import { Category } from "../../../entities"
import { ICategoryRepository } from "../../../repository/categories"

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()

    return categories
  }
}

export { ListCategoriesUseCase }
