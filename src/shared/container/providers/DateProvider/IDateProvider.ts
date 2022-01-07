export default interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertoToUTC(date: Date): string;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
}
