import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppErrors"
import { Car } from "../../infra/typeorm/entities"
import { ICarsRepository } from "../../repository/cars/ICarsRepository"

interface IRequest {
  name: string
  description: string
  daily_rate: number
  lisence_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    lisence_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      lisence_plate
    )

    if (carAlreadyExists) {
      throw new AppError("Car already exists!", 403)
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      lisence_plate,
      fine_amount,
      brand,
      category_id,
    })

    return car
  }
}

export { CreateCarUseCase }
