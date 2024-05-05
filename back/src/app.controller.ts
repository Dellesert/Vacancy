import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return 'Server started!';
  }

  @Get('dates/:date')
  getArrayOfDates(@Param('date') date:string): Date[] {
    const today = new Date(date)
    const year = today.getFullYear()
    const month = today.getMonth()
    const countDays = new Date(year, month, 0).getDate()
    let datesList = []
        for (let i = 1; i < countDays; i++) {
          datesList.push(new Date(Date.UTC(year, month, i, 0, 0, 0)))
        }
        return datesList
  }

  @Get('weekdates')
  getCurrentWeekDates(): Date[] {
    const today = new Date()
    const monday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1,0,0,0))
    const dates = []

    for (let i = 0; i < 6; i++) {
        const date = new Date(monday)
        date.setDate(monday.getDate() + i)
        dates.push(new Date(date))
    }

    return dates
} 

}
