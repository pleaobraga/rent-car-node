import { getRepository, Repository } from "typeorm"

import {
  ICarsRepository,
  ICreateCarDTO,
  IFindAvaibleCarDTO,
} from "../../../repository/cars/ICarsRepository"
import { Car } from "../entities"

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id,
      specifications,
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate })

    return car
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne({ id })

    return car
  }

  async findAvaible({
    name,
    category_id,
    brand,
  }: IFindAvaibleCarDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("car")
      .where("avaiable = :avaiable", { avaiable: true })

    if (brand) {
      carsQuery.andWhere("car.brand = :brand", { brand })
    }

    if (name) {
      carsQuery.andWhere("car.name = :name", { name })
    }

    if (category_id) {
      carsQuery.andWhere("car.category_id = :category_id", { category_id })
    }

    const list = await carsQuery.getMany()

    return list
  }

  async updateAvailable(id: string, avaiable: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ avaiable })
      .where("id = :id")
      .setParameters({ id })
      .execute()
  }
}

export { CarsRepository }
