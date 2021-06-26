//import { inject, injectable } from "tsyringe"

import { AppError } from "../../../../shared/errors/AppErrors"
import { Rental } from "../../infra/typeorm/entities"
import { IRentalsRepository } from "../../repository/rentals"

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

//@injectable()
class CreateRentalUseCase {
  constructor(
    //@inject("")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    user_id,
    expected_return_date,
    car_id,
  }: IRequest): Promise<Rental> {
    const carReserved = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if (carReserved) {
      throw new AppError("Car is unavaiable!", 401)
    }

    const userRentingCar = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    )

    if (userRentingCar) {
      throw new AppError("This user has a rental in progress", 401)
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      expected_return_date,
      car_id,
    })

    return rental
  }
}

export { CreateRentalUseCase }
