import { v4 as uuidv4 } from "uuid";

class Specification {
  public id?: string;
  public name: string;
  public description: string;

  constructor() {
    this.id = this.id ? this.id : uuidv4();
  }
}

export { Specification };
