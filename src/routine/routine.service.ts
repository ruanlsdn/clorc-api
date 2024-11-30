import { CardService } from './../card/card.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RoutineService {
  constructor(private readonly cardService: CardService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async autoDeleteRejectedCards() {
    await this.cardService.deleteRejectedCards();
  }
}
