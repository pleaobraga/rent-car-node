interface IDateProvider {
  compareDays(start_date: Date, end_Date: Date): number
  convertToUtc(date: Date): string
  dateNow(): Date
  addDays(days: number): Date
  compareIfBefore(start_date: Date, end_Date: Date): boolean
}

export { IDateProvider }
