import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Car } from "./Car";

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Car, (car) => car.category)
  cars: Car[];

  constructor() {
    this.id = this.id ? this.id : uuidv4();
  }
}

export { Category };
