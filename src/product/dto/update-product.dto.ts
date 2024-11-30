import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsBoolean()
  countable?: boolean;

  @ApiProperty()
  @IsBoolean()
  active?: boolean;

  @ApiProperty()
  @IsNumber()
  quantity?: number;
}
