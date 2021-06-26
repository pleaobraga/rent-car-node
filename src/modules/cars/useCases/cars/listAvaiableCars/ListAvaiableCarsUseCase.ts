import { inject, injectable } from "tsyringe"

import { Car } from "../../../infra/typeorm/entities"
import { ICarsRepository } from "../../../repository/cars"

interface IResquest {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
class ListAvaiableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ name, brand, category_id }: IResquest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvaible({
      name,
      brand,
      category_id,
    })

    return cars
  }
}

export { ListAvaiableCarsUseCase }
