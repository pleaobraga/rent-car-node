import { Car } from "../../infra/typeorm/entities"

interface ICreateCarDTO {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

interface IFindAvaibleCarDTO {
  name?: string
  brand?: string
  category_id?: string
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
  findAvaible({ name, brand, category_id }: IFindAvaibleCarDTO): Promise<Car[]>
}

export { ICarsRepository, ICreateCarDTO, IFindAvaibleCarDTO }
