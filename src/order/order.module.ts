import { Module } from '@nestjs/common';
import { OrderService } from './order.service';

@Module({
  exports: [OrderService],
  controllers: [],
  providers: [OrderService],
})
export class OrderModule {}
