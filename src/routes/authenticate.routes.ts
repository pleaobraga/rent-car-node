import { Router } from "express"

import { AuthenticateUserController } from "../modules/accounts/useCases/accounts/authenticateUser"

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post("/sessions", authenticateUserController.handle)

export { authenticateRoutes }
