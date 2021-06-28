import { Router } from "express"

import { CreateRentalController } from "../../../../modules/rentals/useCase/createRental"
import { DevolutionRentalController } from "../../../../modules/rentals/useCase/devolutionRental"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle)
rentalsRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
)

export { rentalsRoutes }
