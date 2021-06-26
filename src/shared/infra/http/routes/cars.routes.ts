import { Router } from "express"

import { CreateCarController } from "../../../../modules/cars/useCases/cars/createCar"
import { ListAvaiableCarsController } from "../../../../modules/cars/useCases/cars/listAvaiableCars"
import { ensureAdmin } from "../middleware/endureAdmin"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const lisAvaiableCarController = new ListAvaiableCarsController()

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.get("/avaiable", lisAvaiableCarController.handle)

export { carsRoutes }
