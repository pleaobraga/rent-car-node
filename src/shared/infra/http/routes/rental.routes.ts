import { Router } from "express"

import { CreateRentalController } from "../../../../modules/rentals/useCase/createRental"
import { ensureAdmin } from "../middleware/endureAdmin"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()

rentalsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createRentalController.handle
)

export { rentalsRoutes }
