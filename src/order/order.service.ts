import { Injectable } from '@nestjs/common';
import { CardProductDto } from 'src/card/dto/card-product.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(cardId: string, selectedProducts: CardProductDto[]) {
    selectedProducts.forEach(async (selectedProduct) => {
      await this.prisma.order.create({
        data: {
          cardId: cardId,
          productId: selectedProduct.productId,
          productPrice: selectedProduct.productPrice,
          productQuantity: selectedProduct.productQuantity,
        },
      });
    });
  }
}
