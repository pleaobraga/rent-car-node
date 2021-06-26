import { CarImage } from "../../infra/typeorm/entities/CarImage"
import {
  ICarsImagesRepository,
  ICreateCarImageDTO,
} from "./ICarsImagesRepository"

class CarsImagesRepositoryInMemory implements ICarsImagesRepository {
  carsImages: CarImage[] = []

  async create({ image_name, car_id }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = new CarImage()

    Object.assign(carImage, {
      image_name,
      car_id,
    })

    this.carsImages.push(carImage)

    return carImage
  }
}

export { CarsImagesRepositoryInMemory }
