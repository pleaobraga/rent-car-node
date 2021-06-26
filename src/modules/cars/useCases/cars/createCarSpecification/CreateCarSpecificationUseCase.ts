import { inject, injectable } from "tsyringe"

import { AppError } from "../../../../../shared/errors/AppErrors"
import { Car } from "../../../infra/typeorm/entities"
import { ICarsRepository } from "../../../repository/cars"
import { ISpecificationsRepository } from "../../../repository/specifications"

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id)

    if (!carExists) {
      throw new AppError("Car does not exists", 404)
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    )

    carExists.specifications = specifications

    await this.carsRepository.create(carExists)

    return carExists
  }
}

export { CreateCarSpecificationUseCase }
