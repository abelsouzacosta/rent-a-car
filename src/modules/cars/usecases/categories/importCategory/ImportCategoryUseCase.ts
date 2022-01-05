import { ICategoryRepository } from "@modules/cars/repositories/category/ICategoryRepository";
import { parse } from "csv-parse";
import { createReadStream } from "fs";

class ImportCategoryUseCase {
  protected repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  execute(file: Express.Multer.File): void {
    const stream = createReadStream(file.path);

    const parseFile = parse({});

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      const [name, description] = line;

      this.repository.create({ name, description });
    });
  }
}

export { ImportCategoryUseCase };
