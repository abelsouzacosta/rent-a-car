import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Rental } from "@modules/cars/infra/typeorm/entities/Rental";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Rental, (rental) => rental.user)
  rentals: Rental[];

  constructor() {
    this.id = this.id ? this.id : uuidv4();
  }
}

export { User };
