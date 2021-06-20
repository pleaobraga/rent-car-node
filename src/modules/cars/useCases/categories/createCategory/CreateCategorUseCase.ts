import { ICategoryRepository } from '../../../repository/categories'

interface IRequest {
  name: string
  description: string
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  execute({ name, description }: IRequest): void {
    const hasCategory = this.categoriesRepository.findByName(name)

    if (hasCategory) {
      throw new Error('Category already exists')
      //   return response.status(400).json({ error: 'Category already exists' })
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
