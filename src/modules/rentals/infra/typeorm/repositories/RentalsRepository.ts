import { getRepository, Repository } from "typeorm"

import {
  ICreateRentalDTO,
  IRentalsRepository,
} from "../../../repository/rentals"
import { Rental } from "../entities"

class RentalsRepository implements IRentalsRepository {
  repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create({
    user_id,
    expected_return_date,
    car_id,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      expected_return_date,
      car_id,
      id,
      end_date,
      total,
    })

    await this.repository.save(rental)

    return rental
  }

  async findOpenRentalByCar(id: string): Promise<Rental> {
    const resp = await this.repository.findOne({ car_id: id })

    return resp
  }

  async findOpenRentalByUser(id: string): Promise<Rental> {
    const resp = await this.repository.findOne({ user_id: id })

    return resp
  }

  async findById(id: string): Promise<Rental> {
    const resp = await this.repository.findOne({ id })

    return resp
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const resp = await this.repository.find({
      where: { user_id },
      relations: ["car"],
    })

    return resp
  }
}

export { RentalsRepository }
