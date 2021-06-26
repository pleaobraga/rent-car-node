import { Router } from "express"

import { CreateSpecificationController } from "../../../../modules/cars/useCases/specifications/createSpecification"
import { ListSpecificationsController } from "../../../../modules/cars/useCases/specifications/listSpecifications"
import { ensureAdmin } from "../middleware/endureAdmin"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
)

specificationsRoutes.get("/", listSpecificationsController.handle)

export { specificationsRoutes }
