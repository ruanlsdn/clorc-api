import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';
import { OrderModule } from './order/order.module';
import { ReportModule } from './report/report.module';
import { RoutineModule } from './routine/routine.module';

@Module({
  imports: [PrismaModule, UserModule, ProductModule, AuthModule, CardModule, OrderModule, ReportModule, RoutineModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
