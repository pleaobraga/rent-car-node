import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { IDateProvider } from "./IDateProvider"

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
  compareDays(start_date: Date, end_Date: Date): number {
    const utcStartDate = this.convertToUtc(start_date)
    const utcEndDate = this.convertToUtc(end_Date)

    console.log()

    return dayjs(utcEndDate).diff(utcStartDate, "days")
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  dateNow(): Date {
    return dayjs().toDate()
  }
}

export { DayjsDateProvider }