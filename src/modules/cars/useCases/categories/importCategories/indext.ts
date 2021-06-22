import { CategoriesRepository } from "../../../repository/categories"
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase"
import { ImportCategoryController } from "./ImportCategoryController"

export default (): ImportCategoryController => {
  const categoriesRepository = new CategoriesRepository()

  const importCategoriesUseCase = new ImportCategoriesUseCase(
    categoriesRepository
  )
  const importCategoryController = new ImportCategoryController(
    importCategoriesUseCase
  )

  return importCategoryController
}
