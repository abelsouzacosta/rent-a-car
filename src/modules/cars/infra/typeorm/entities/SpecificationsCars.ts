import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Car } from "./Car";
import { Specification } from "./Specification";

@Entity("specifications_cars")
class SpecificationsCars {
  @PrimaryColumn()
  id?: string;

  @Column()
  car_id: string;

  @Column()
  specification_id: string;

  @OneToMany(() => Car, (car) => car.specifications_cars)
  @JoinColumn({ name: "car_id" })
  car: Car[];

  @OneToMany(
    () => Specification,
    (specification) => specification.specifications_cars
  )
  @JoinColumn({ name: "specification_id" })
  specification: Specification[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.id = this.id ? this.id : uuidv4();
  }
}

export { SpecificationsCars };
