import { Router } from "express"
import multer from "multer"

import { CreateCategoryController } from "../../../../modules/cars/useCases/categories/createCategory"
import { ImportCategoryController } from "../../../../modules/cars/useCases/categories/importCategories/indext"
import { ListCategoriesController } from "../../../../modules/cars/useCases/categories/listCategories"
import { ensureAdmin } from "../middleware/endureAdmin"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"

const categoriesRoutes = Router()

const upload = multer({
  dest: "./tmp",
})

const createCategoryController = new CreateCategoryController()
const listCategoriesController = new ListCategoriesController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle
)

export { categoriesRoutes }
