import { Request, Response } from "express"
import { container } from "tsyringe"

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { password, email } = request.body

      const authenticateUserUsercase = container.resolve(
        AuthenticateUserUseCase
      )

      const authInfo = await authenticateUserUsercase.execute({
        password,
        email,
      })

      return response.json(authInfo)
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
}

export { AuthenticateUserController }
