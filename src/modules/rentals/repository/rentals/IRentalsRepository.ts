import { Rental } from "../../infra/typeorm/entities"

interface ICreateRentalDTO {
  user_id: string
  expected_return_date: Date
  car_id: string
  id?: string
  end_date?: Date
  total?: number
}

interface IRentalsRepository {
  create({
    user_id,
    expected_return_date,
    car_id,
  }: ICreateRentalDTO): Promise<Rental>
  findOpenRentalByCar(id: string): Promise<Rental>
  findOpenRentalByUser(id: string): Promise<Rental>
  findById(id: string): Promise<Rental>
  findByUser(id: string): Promise<Rental[]>
}

export { ICreateRentalDTO, IRentalsRepository }
