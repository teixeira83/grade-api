import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { WeekDaysService } from './week-days.service'
import { CreateWeekDayDto } from './dto/create-week-day.dto'
import { UpdateWeekDayDto } from './dto/update-week-day.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('week-days')
@ApiTags('Week-days')
export class WeekDaysController {
  constructor(private readonly weekDaysService: WeekDaysService) {}

  @Post()
  create(@Body() createWeekDayDto: CreateWeekDayDto) {
    return this.weekDaysService.create(createWeekDayDto)
  }

  @Get()
  findAll() {
    return this.weekDaysService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weekDaysService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeekDayDto: UpdateWeekDayDto) {
    return this.weekDaysService.update(id, updateWeekDayDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weekDaysService.remove(id)
  }
}
