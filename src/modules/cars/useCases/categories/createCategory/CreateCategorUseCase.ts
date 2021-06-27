import { injectable, inject } from "tsyringe"
import { AppError } from "../../../../../shared/errors/AppErrors"

import { ICategoryRepository } from "../../../repository/categories"

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const hasCategory = await this.categoriesRepository.findByName(name)

    console.log("hasCategory", hasCategory)

    if (hasCategory) {
      console.log("entrou aki")
      throw new AppError("Category already exists", 403)
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
