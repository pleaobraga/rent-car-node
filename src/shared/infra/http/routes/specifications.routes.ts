import { Router } from "express"

import { CreateSpecificationController } from "../../../../modules/cars/useCases/specifications/createSpecification"
import { ListSpecificationsController } from "../../../../modules/cars/useCases/specifications/listSpecifications"

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()

specificationsRoutes.post("/", createSpecificationController.handle)

specificationsRoutes.get("/", listSpecificationsController.handle)

export { specificationsRoutes }
