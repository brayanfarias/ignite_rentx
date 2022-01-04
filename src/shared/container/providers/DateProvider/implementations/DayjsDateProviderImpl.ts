import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import IDateProvider from "../IDateProvider";

dayjs.extend(utc);

export default class DayjsDateProviderImpl implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }
  convertoToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  compareInHours(start_date: Date, end_date: Date): number {
    const endUTC = this.convertoToUTC(end_date);
    const startUTC = this.convertoToUTC(start_date);
    return dayjs(endUTC).diff(startUTC, "hours");
  }
}
