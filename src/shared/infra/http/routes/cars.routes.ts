import { Router } from "express"

import { CreateCarController } from "../../../../modules/cars/useCases/createCar"
import { ensureAdmin } from "../middleware/endureAdmin"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"

const carsRoutes = Router()

const createCarController = new CreateCarController()

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

export { carsRoutes }
