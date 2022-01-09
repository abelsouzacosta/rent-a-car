import { ICategoryRepository } from "@modules/cars/repositories/category/ICategoryRepository";
import { parse } from "csv-parse";
import { createReadStream, promises } from "fs";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  protected repository: ICategoryRepository;

  protected categories: IImportCategory[];

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
    this.categories = [];
  }

  load(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = createReadStream(file.path);

      const parseFile = parse({});

      stream.pipe(parseFile);

      parseFile
        .on("data", (line) => {
          const [name, description] = line;

          this.categories.push({ name, description });
        })
        .on("end", () => {
          promises.unlink(file.path);
          resolve(this.categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const response = await this.load(file);

    response.map(async ({ name, description }) => {
      const categoryAlreadyExists = this.repository.findByName(name);

      if (!categoryAlreadyExists) this.repository.create({ name, description });
    });
  }
}

export { ImportCategoryUseCase };
