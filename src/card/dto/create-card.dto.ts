import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CardProductDto } from './card-product.dto';

export class CreateCardDto {
  @ApiProperty()
  @IsString()
  clientName: string;

  @ApiProperty()
  @IsString()
  clientAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  products: CardProductDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
