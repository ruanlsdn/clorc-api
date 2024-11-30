import { ProductModule } from '../product/product.module';
import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [OrderModule, ProductModule],
  exports: [CardService],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
