import { CategoriesRepository } from '../../../repository/categories'
import { CreateCategoryUseCase } from './CreateCategorUseCase'
import { CreateCategoryController } from './CreateCategoryController'

const categoriesRepository = CategoriesRepository.getInstance()
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
)

export { createCategoryController }
