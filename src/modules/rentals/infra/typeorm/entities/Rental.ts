import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id?: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  user_id: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Car, (car) => car.rentals)
  @JoinColumn({ name: "car_id" })
  car: Car;

  @ManyToOne(() => User, (user) => user.rentals)
  @JoinColumn({ name: "user_id" })
  user: User;

  constructor() {
    this.id = this.id ? this.id : uuidv4();
  }
}

export { Rental };
