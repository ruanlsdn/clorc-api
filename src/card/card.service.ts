import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardStatusDto } from './dto/update-card-status.dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class CardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderService: OrderService,
  ) {}

  async create(data: CreateCardDto) {
    const createdCard = await this.prisma.card.create({
      data: { clientName: data.clientName, userId: data.userId },
    });

    this.orderService.create(createdCard.id, data.products);

    return await this.findUnique(createdCard.id);
  }

  async updateCardStatus(id: string, data: UpdateCardStatusDto) {
    return await this.prisma.card.update({ where: { id }, data });
  }

  async findByUserId(userId: string) {
    return await this.prisma.card.findMany({ where: { userId } });
  }

  async findUnique(id: string) {
    return await this.prisma.card.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        clientName: true,
        checked: true,
        orders: {
          select: {
            productQuantity: true,
            productPrice: true,
            product: { select: { description: true } },
          },
          orderBy: { productQuantity: 'desc' },
        },
        createdAt: true,
      },
    });
  }
}
