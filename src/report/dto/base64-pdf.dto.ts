import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class Base64PdfDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  base64: string;
}
