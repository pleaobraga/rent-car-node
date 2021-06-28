import { inject, injectable } from "tsyringe"
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider"
import { AppError } from "../../../../shared/errors/AppErrors"
import { ICarsRepository } from "../../../cars/repository/cars"
import { Rental } from "../../infra/typeorm/entities"
import { IRentalsRepository } from "../../repository/rentals"

interface IRequest {
  id: string
  user_id: string
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ user_id, id }: IRequest): Promise<Rental> {
    const minimum_daily = 1
    const rental = await this.rentalsRepository.findById(id)

    if (!rental) {
      throw new AppError("Rental does not exists!")
    }

    const car = await this.carsRepository.findById(rental.car_id)

    if (!car) {
      throw new AppError("Car does not exists!")
    }

    const now = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareDays(rental.start_date, now)

    if (daily <= 0) {
      daily = minimum_daily
    }

    const delay = this.dateProvider.compareDays(
      now,
      rental.expected_return_date
    )

    let total = 0

    if (delay > 1) {
      const calculate_fine = delay * car.fine_amount
      total += calculate_fine
    }

    total += daily * car.daily_rate
    rental.end_date = this.dateProvider.dateNow()

    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}

export { DevolutionRentalUseCase }
