import { isNull } from "lodash"

import { Rental } from "../../infra/typeorm/entities"
import { ICreateRentalDTO, IRentalsRepository } from "./IRentalsRepository"

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  async create({
    user_id,
    expected_return_date,
    car_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      user_id,
      expected_return_date,
      car_id,
      start_date: new Date(),
    })

    this.rentals.push(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    throw new Error("Method not implemented.")
  }

  async findOpenRentalByCar(id: string): Promise<Rental> {
    return this.rentals.find((r) => r.car_id === id && !r.end_date)
  }

  async findOpenRentalByUser(id: string): Promise<Rental> {
    return this.rentals.find((r) => r.user_id === id && !r.end_date)
  }
}

export { RentalsRepositoryInMemory }
