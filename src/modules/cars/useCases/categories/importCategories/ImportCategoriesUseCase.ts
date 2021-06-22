import csvParse from "csv-parse"
import fs from "fs"
import { inject, injectable } from "tsyringe"

import { CategoriesRepository } from "../../../repository/categories"

interface IImportCategory {
  name: string
  description: string
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on("data", async ([name, description]) => {
          categories.push({
            name,
            description,
          })
        })
        .on("end", () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on("error", (err) => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.forEach(async ({ name, description }) => {
      const hasCategory = await this.categoriesRepository.findByName(name)

      if (!hasCategory) {
        await this.categoriesRepository.create({
          name,
          description,
        })
      }
    })
  }
}

export { ImportCategoriesUseCase }
