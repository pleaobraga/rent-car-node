import { CategoriesRepository } from '../../../repository/categories'
import { ImportCategoriesUseCase } from './ImportCategoriesUseCase'
import { ImportCategoryController } from './ImportCategoryController'

const categoriesRepository = CategoriesRepository.getInstance()

const importCategoriesUseCase = new ImportCategoriesUseCase(
  categoriesRepository
)
const importCategoryController = new ImportCategoryController(
  importCategoriesUseCase
)

export { importCategoryController }
