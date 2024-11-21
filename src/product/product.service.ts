import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CardDto } from 'src/card/dto/card-dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return await this.prisma.product.create({
      data,
    });
  }

  async findAll(userId: string) {
    return await this.prisma.product.findMany({
      where: { userId },
      orderBy: { description: Prisma.SortOrder.asc },
    });
  }

  async findOne(id: string) {
    return await this.prisma.product.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, data: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.product.delete({ where: { id } });
  }

  async removeMany(userId: string) {
    return await this.prisma.product.deleteMany({ where: { userId } });
  }

  async updateProductsFromCard(selectedCard: CardDto) {
    const updatedProducts = [];

    for (const order of selectedCard.orders) {
      const currentProduct = await this.findOne(order.product.id);
      updatedProducts.push(
        await this.update(currentProduct.id, {
          quantity: currentProduct.quantity - order.productQuantity,
        }),
      );
    }

    return updatedProducts;
  }
}
