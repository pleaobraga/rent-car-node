import { Request, Response } from "express"
import { container } from "tsyringe"

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase"

class UpdateAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user
      const avatar_file = request.file.filename

      const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

      await updateUserAvatarUseCase.execute({ user_id, avatar_file })

      return response.status(204).send()
    } catch (e) {
      return response.status(e.statusCode || 400).json({ error: e.message })
    }
  }
}

export { UpdateAvatarController }
