import { AppError } from "../../../../../shared/errors/AppErrors"
import { CategoriesRepositoryInMemory } from "../../../repository/categories"
import { CreateCategoryUseCase } from "./CreateCategorUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category test description",
    }

    await createCategoryUseCase.execute({ ...category })

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    )

    expect(categoryCreated).toHaveProperty("id")
  })

  it("should not be able to create a new category with same name", async () => {
    const category = {
      name: "Category Test",
      description: "Category test description",
    }

    await createCategoryUseCase.execute({ ...category })

    await expect(
      createCategoryUseCase.execute({ ...category })
    ).rejects.toEqual(new AppError("Category already exists", 403))
  })
})
