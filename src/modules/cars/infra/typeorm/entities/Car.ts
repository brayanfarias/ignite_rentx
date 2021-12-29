import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import Category from "./Category";
import Specification from "./Specification";

@Entity("cars")
export default class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumn: { name: "car_id" },
    inverseJoinColumn: { name: "specification_id" },
  })
  specification: Specification[];

  constructor() {
    if (!this.id) this.id = uuid();
    this.available = true;
  }
}
