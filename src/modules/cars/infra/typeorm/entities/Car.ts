import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { CarsImages } from "./CarsImages";
import { Category } from "./Category";
import { SpecificationsCars } from "./SpecificationsCars";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  avaliable: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, (category) => category.cars)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(
    () => SpecificationsCars,
    (specifications_cars) => specifications_cars.car
  )
  specifications_cars: SpecificationsCars[];

  @OneToMany(() => CarsImages, (cars_images) => cars_images.car)
  cars_images: CarsImages[];

  @OneToMany(() => Rental, (rental) => rental.car)
  rentals: Rental[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.id = this.id ? this.id : uuidv4();
  }
}

export { Car };
