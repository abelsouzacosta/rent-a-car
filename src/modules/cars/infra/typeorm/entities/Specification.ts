import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { SpecificationsCars } from "./SpecificationsCars";

@Entity("specifications")
class Specification {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(
    () => SpecificationsCars,
    (specifications_cars) => specifications_cars.specification
  )
  specifications_cars: SpecificationsCars[];

  constructor() {
    this.id = this.id ? this.id : uuidv4();
  }
}

export { Specification };
