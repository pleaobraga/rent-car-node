import { inject, injectable } from "tsyringe"

import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider"
import { AppError } from "../../../../shared/errors/AppErrors"
import { ICarsRepository } from "../../../cars/repository/cars"
import { Rental } from "../../infra/typeorm/entities"
import { IRentalsRepository } from "../../repository/rentals"

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    expected_return_date,
    car_id,
  }: IRequest): Promise<Rental> {
    const minAvailableDayPerCar = 1

    const carReserved = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if (carReserved) {
      throw new AppError("Car is unavailable!", 401)
    }

    const userRentingCar = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    )

    if (userRentingCar) {
      throw new AppError("This user has a rental in progress", 401)
    }

    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareDays(dateNow, expected_return_date)

    if (compare < minAvailableDayPerCar) {
      throw new AppError("The rental needs to have at least one day", 400)
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      expected_return_date,
      car_id,
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}

export { CreateRentalUseCase }
