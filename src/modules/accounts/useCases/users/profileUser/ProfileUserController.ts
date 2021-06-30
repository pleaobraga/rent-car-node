import { Request, Response } from "express"
import { container } from "tsyringe"

import { ProfileUserUseCase } from "./ProfileUserUseCase"

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user

      const profileUserUseCase = container.resolve(ProfileUserUseCase)

      const user = await profileUserUseCase.execute(id)

      return response.json(user)
    } catch (e) {
      return response.status(e.statusCode || 500).json({ error: e.message })
    }
  }
}

export { ProfileUserController }
