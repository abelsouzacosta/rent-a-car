import { v4 as uuidv4 } from "uuid";

class Category {
  protected id?: string;
  public name: string;
  public description: string;
  public createdAt: Date;

  constructor() {
    this.id = this.id ? this.id : uuidv4();
  }
}

export { Category };
