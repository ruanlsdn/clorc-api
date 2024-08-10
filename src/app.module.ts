import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [PrismaModule, UserModule, ProductModule, AuthModule, CardModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
