import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayJsDateProvider implements IDateProvider {
  private convertoToUTC(date: Date): string {
    const formattedDate = dayjs(date).utc().local().format();

    return formattedDate;
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const startDateFormatted = this.convertoToUTC(start_date);
    const endDateFormatted = this.convertoToUTC(end_date);

    const comparation = dayjs(startDateFormatted).diff(
      endDateFormatted,
      "hours"
    );

    return comparation;
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayJsDateProvider };
