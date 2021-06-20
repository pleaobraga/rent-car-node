import { Router } from 'express'

import { SpecificationRepository } from '../modules/cars/repository/specifications'
import { CreateSpecificationService } from '../modules/cars/service/specification'

const specificationsRoutes = Router()

const specificationRepository = new SpecificationRepository()

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const createSpecificationService = new CreateSpecificationService(
    specificationRepository
  )

  createSpecificationService.execute({ name, description })

  return response.status(201).send()
})

specificationsRoutes.get('/', (request, response) => {
  const allCategories = specificationRepository.list()

  return response.json(allCategories)
})

export { specificationsRoutes }
