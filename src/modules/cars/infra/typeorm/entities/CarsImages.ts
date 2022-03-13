import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Car } from "./Car";

@Entity("cars_images")
class CarsImages {
  @PrimaryColumn()
  id?: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @ManyToOne(() => Car, (car) => car.cars_images)
  @JoinColumn({ name: "car_id" })
  car: Car;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.id = this.id ? this.id : uuidv4();
  }
}

export { CarsImages };
