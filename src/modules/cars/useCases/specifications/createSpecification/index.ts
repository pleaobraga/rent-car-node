import { SpecificationRepository } from '../../../repository/specifications'
import { CreateSpecificationController } from './CreateSpecificationController'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

const specificationsRepository = SpecificationRepository.getInstance()
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
)

const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
)

export { createSpecificationController }
