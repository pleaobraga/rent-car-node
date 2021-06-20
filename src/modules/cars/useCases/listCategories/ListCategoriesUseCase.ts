import { Category } from '../../model'
import { ICategoryRepository } from '../../repository/categories'

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.list()
  }
}

export { ListCategoriesUseCase }
