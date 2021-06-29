import { Request, Response } from "express"
import { container } from "tsyringe"

import { ResetPasswordUseCase } from "./ResetPasswordUseCase"

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request.query
      const { password } = request.body

      const resetPasswordUseCase = container.resolve(ResetPasswordUseCase)

      await resetPasswordUseCase.execute({ token: String(token), password })

      return response.send()
    } catch (e) {
      return response.status(e.statusCode || 500).json({ error: e.message })
    }
  }
}

export { ResetPasswordController }
