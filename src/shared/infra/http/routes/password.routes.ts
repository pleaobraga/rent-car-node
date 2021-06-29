import { Router } from "express"

import { ResetPasswordController } from "../../../../modules/accounts/useCases/accounts/resetPassword"
import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/accounts/sendForgotPasswordMail"

const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordController()

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle)
passwordRoutes.post("/reset", resetPasswordController.handle)

export { passwordRoutes }
