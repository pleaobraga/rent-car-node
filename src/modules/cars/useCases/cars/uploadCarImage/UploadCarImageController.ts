import { Request, Response } from "express"
import { container } from "tsyringe"

import { UploadCarImageUseCase } from "./UploadCarImageCarUseCase"

interface IFiles {
  filename: string
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const images = request.files as IFiles[]

      const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)

      const images_name = images.map((i) => i.filename)

      const imagesName = await uploadCarImageUseCase.execute({
        car_id: id,
        images_name,
      })

      return response.json(imagesName)
    } catch (e) {
      return response.status(e.statusCode || 500).json({ error: e.message })
    }
  }
}

export { UploadCarImageController }
