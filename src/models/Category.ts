import { v4 as uuidv4 } from "uuid";

class Category {
  protected id?: string;
  protected name: string;
  protected description: string;
  protected createdAt: Date;

  constructor() {
    this.id = this.id ? this.id : uuidv4();
  }
}

export { Category };
