import { container } from "tsyringe"

import "./providers"
import {
  IUsersRepository,
  UsersRepository,
} from "../../modules/accounts/repositories/users"
import {
  IUsersTokensRepository,
  UsersTokensRepository,
} from "../../modules/accounts/repositories/usersTokens"
import {
  ICarsRepository,
  CarsRepository,
} from "../../modules/cars/repository/cars"
import {
  ICarsImagesRepository,
  CarsImagesRepository,
} from "../../modules/cars/repository/carsImages"
import {
  ICategoryRepository,
  CategoriesRepository,
} from "../../modules/cars/repository/categories"
import {
  ISpecificationsRepository,
  SpecificationsRepository,
} from "../../modules/cars/repository/specifications"
import { RentalsRepository } from "../../modules/rentals/infra/typeorm/repositories"
import { IRentalsRepository } from "../../modules/rentals/repository/rentals"

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository)

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
)
