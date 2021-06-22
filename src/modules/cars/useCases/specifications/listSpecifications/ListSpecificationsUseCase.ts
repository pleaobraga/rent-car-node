import { Specification } from '../../../entities'
import { ISpecificationRepository } from '../../../repository/specifications'

class ListSpecificationsUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute(): Specification[] {
    return this.specificationRepository.list()
  }
}

export { ListSpecificationsUseCase }
