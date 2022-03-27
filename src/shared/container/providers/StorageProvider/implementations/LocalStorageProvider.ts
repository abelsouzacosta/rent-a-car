import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";
import { ApplicationError } from "@shared/errors/ApplicationError";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    const fileExists = fs.existsSync(filename);

    if (!fileExists)
      throw new ApplicationError("File or directory not found", 404);

    if (fileExists) await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
