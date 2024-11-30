import { CardModule } from './../card/card.module';
import { Module } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), CardModule],
  providers: [RoutineService],
})
export class RoutineModule {}
