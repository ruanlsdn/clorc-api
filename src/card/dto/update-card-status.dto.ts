import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateCardStatusDto {
  @ApiProperty()
  @IsBoolean()
  checked: boolean;
}
