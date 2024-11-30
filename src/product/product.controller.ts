import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: string) {
    return await this.productService.findAll(userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(id, updateProductDto);
  }

  @Patch('/virtual-delete/:id')
  async virtualRemove(@Param('id') id: string) {
    return await this.productService.virtualRemove(id);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.productService.remove(id);
  // }

  // @Delete('/remove-many/:userId')
  // async removeMany(@Param('userId') userId: string) {
  //   return await this.productService.removeMany(userId);
  // }
}
