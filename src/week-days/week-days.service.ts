import { Injectable } from '@nestjs/common'
import { CreateWeekDayDto } from './dto/create-week-day.dto'
import { UpdateWeekDayDto } from './dto/update-week-day.dto'

@Injectable()
export class WeekDaysService {
  create(createWeekDayDto: CreateWeekDayDto) {
    return 'This action adds a new weekDay'
  }

  findAll() {
    return `This action returns all weekDays`
  }

  findOne(id: string) {
    return `This action returns a #${id} weekDay`
  }

  update(id: string, updateWeekDayDto: UpdateWeekDayDto) {
    return `This action updates a #${id} weekDay`
  }

  remove(id: string) {
    return `This action removes a #${id} weekDay`
  }
}
