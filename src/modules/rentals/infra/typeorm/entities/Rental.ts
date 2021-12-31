import { v4 as uuid } from "uuid";

export default class Rental {
  id: string;

  start_date: Date;

  end_date: Date;

  expect_return_date: Date;

  total: number;

  created_at: Date;

  updated_at: Date;

  car_id: string;

  user_id: string;

  constructor() {
    if (!this.id) this.id = uuid();
    this.start_date = new Date();
  }
}
