import { parse } from "csv-parse";
import fs from "fs";

import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  private getCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories: IImportCategory[] = await this.getCategories(file);
    categories.forEach((category) => {
      const { name, description } = category;

      const exists = this.categoryRepository.findByName(name);

      if (!exists) {
        this.categoryRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
