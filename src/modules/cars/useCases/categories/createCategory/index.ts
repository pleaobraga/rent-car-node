import { CategoriesRepository } from "../../../repository/categories"
import { CreateCategoryUseCase } from "./CreateCategorUseCase"
import { CreateCategoryController } from "./CreateCategoryController"

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  )

  return createCategoryController
}
