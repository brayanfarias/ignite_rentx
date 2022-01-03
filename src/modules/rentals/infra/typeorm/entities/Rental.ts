import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  constructor() {
    if (!this.id) this.id = uuid();
    this.start_date = new Date();
  }
}
