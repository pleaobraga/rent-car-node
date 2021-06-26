import { inject, injectable } from "tsyringe"

import { CarImage } from "../../../infra/typeorm/entities/CarImage"
import { ICarsImagesRepository } from "../../../repository/carsImages"

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ images_name, car_id }: IRequest): Promise<CarImage[]> {
    const carsImages = await Promise.all(
      images_name.map(async (image_name) => {
        const carImage = await this.carsImagesRepository.create({
          image_name,
          car_id,
        })

        return carImage
      })
    )

    return carsImages
  }
}

export { UploadCarImageUseCase }
