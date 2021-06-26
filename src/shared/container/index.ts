import { container } from "tsyringe"

import {
  IUsersRepository,
  UsersRepository,
} from "../../modules/accounts/repositories/users"
import {
  ICarsRepository,
  CarsRepository,
} from "../../modules/cars/repository/cars"
import {
  ICategoryRepository,
  CategoriesRepository,
} from "../../modules/cars/repository/categories"
import {
  ISpecificationRepository,
  SpecificationRepository,
} from "../../modules/cars/repository/specifications"

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository)
