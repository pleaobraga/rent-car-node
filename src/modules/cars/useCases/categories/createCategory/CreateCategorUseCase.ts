import { injectable, inject } from "tsyringe"

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

    if (hasCategory) {
      throw new Error("Category already exists")
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
