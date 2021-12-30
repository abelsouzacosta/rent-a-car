import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const useCase = new ImportCategoryUseCase();
const import_category = new ImportCategoryController(useCase);

export { import_category };
