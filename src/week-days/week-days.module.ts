import { Module } from '@nestjs/common';
import { WeekDaysService } from './week-days.service';
import { WeekDaysController } from './week-days.controller';

@Module({
  controllers: [WeekDaysController],
  providers: [WeekDaysService]
})
export class WeekDaysModule {}
