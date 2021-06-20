import { Specification } from '../../../model'
import { ISpecificationRepository } from '../../../repository/specifications'

class ListSpecificationsUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute(): Specification[] {
    return this.specificationRepository.list()
  }
}

export { ListSpecificationsUseCase }
