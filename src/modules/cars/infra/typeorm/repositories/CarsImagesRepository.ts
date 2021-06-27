import { getRepository, Repository } from "typeorm"

import {
  ICarsImagesRepository,
  ICreateCarImageDTO,
} from "../../../repository/carsImages"
import { CarImage } from "../entities/CarImage"

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  async create({ image_name, car_id }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    })

    await this.repository.save(carImage)

    return carImage
  }
}

export { CarsImagesRepository }
