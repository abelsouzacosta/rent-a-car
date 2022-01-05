import { parse } from "csv-parse";
import { createReadStream } from "fs";

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    const stream = createReadStream(file.path);

    const parseFile = parse({});

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
