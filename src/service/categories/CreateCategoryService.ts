import { CategoriesRepository } from '../../repository'

interface IRequest {
  name: string
  description: string
}

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const hasCategory = this.categoriesRepository.findByName(name)

    if (hasCategory) {
      throw new Error('Category already exists')
      //   return response.status(400).json({ error: 'Category already exists' })
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryService }
