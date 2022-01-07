export default interface ICreateRentalDTO {
  id?: string;
  end_date?: Date;
  user_id: string;
  car_id: string;
  expect_return_date: Date;
  total?: number;
}
