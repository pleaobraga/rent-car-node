import { Car } from "../../infra/typeorm/entities"
import {
  ICarsRepository,
  ICreateCarDTO,
  IFindAvaibleCarDTO,
} from "./ICarsRepository"

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

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
    const car = new Car()

    Object.assign(car, {
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      name,
      id,
      specifications,
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((c) => c.license_plate === license_plate)
  }

  async findAvaible({
    name,
    category_id,
    brand,
  }: IFindAvaibleCarDTO): Promise<Car[]> {
    const cars = this.cars.filter((c) => {
      if (c.avaiable === true) {
        if (
          (name && c.name === name) ||
          (category_id && c.category_id === category_id) ||
          (brand && c.brand === brand)
        ) {
          return c
        }

        return c
      }

      return null
    })

    return cars
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((c) => c.id === id)
  }
}

export { CarsRepositoryInMemory }
