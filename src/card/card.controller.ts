import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardStatusDto } from './dto/update-card-status.dto';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardService.create(createCardDto);
  }

  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return await this.cardService.findByUserId(userId);
  }

  @Get('/user/:userId/period')
  async findByPeriod(
    @Param('userId') userId: string,
    @Query('initialDate') initialDate: Date,
    @Query('finalDate') finalDate: Date,
  ) {
    return await this.cardService.findByPeriod(userId, initialDate, finalDate);
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return await this.cardService.findUnique(id);
  }

  @Patch(':id')
  async updateCardStatus(
    @Param('id') id: string,
    @Body() updateCardStatusDto: UpdateCardStatusDto,
  ) {
    return await this.cardService.updateCardStatus(id, updateCardStatusDto);
  }
}
