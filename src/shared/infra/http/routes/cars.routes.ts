import { Router } from "express"

import { CreateCarController } from "../../../../modules/cars/useCases/cars/createCar"
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/cars/createCarSpecification"
import { ListAvaiableCarsController } from "../../../../modules/cars/useCases/cars/listAvaiableCars"
import { ensureAdmin } from "../middleware/endureAdmin"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const lisAvaiableCarController = new ListAvaiableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
)

carsRoutes.get("/avaiable", lisAvaiableCarController.handle)

export { carsRoutes }
