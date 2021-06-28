import { Router } from "express"

import { CreateRentalController } from "../../../../modules/rentals/useCase/createRental"
import { DevolutionRentalController } from "../../../../modules/rentals/useCase/devolutionRental"
import { ListRentalsByUserController } from "../../../../modules/rentals/useCase/listRentalsByUserUseCase"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle)
rentalsRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
)
rentalsRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
)

export { rentalsRoutes }
