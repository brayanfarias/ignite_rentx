import Car from "@modules/cars/infra/typeorm/entities/Car";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("rentals")
export default class Rental {
  @PrimaryColumn()
  id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expect_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Car)
  @JoinColumn({
    name: "car_id",
  })
  car: Car;

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  constructor() {
    if (!this.id) this.id = uuid();
    this.start_date = new Date();
  }
}
